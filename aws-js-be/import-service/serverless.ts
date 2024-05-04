import type { AWS } from '@serverless/typescript';
import 'dotenv/config'

import { functions } from "@functions/index";
import * as process from "node:process";

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    // 'serverless-auto-swagger',
    'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-central-1',
    profile: 'aws-js',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
      SQS_URL: process.env.SQS_URL
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              's3:*',
              's3-object-lambda:*'
            ],
            Resource: 'arn:aws:s3:::${self:provider.environment.S3_BUCKET_NAME}/*',
          },
          {
            Effect: "Allow",
            Action: [
              "sqs:*"
            ],
            Resource: "*"
          }
        ]
      }
    },
  },
  functions,
  resources: {
    Resources: {
      ImportS3Bucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${self:provider.environment.S3_BUCKET_NAME}',
          VersioningConfiguration: {
            Status: 'Enabled'
          },
          CorsConfiguration: {
            CorsRules: [
              {
                "AllowedHeaders": [
                  "*"
                ],
                "AllowedMethods": [
                  "GET", "PUT"
                ],
                "AllowedOrigins": [
                  "*"
                ],
                "MaxAge": 3600
              }
            ]
          }
        },
      },
      GatewayResponse: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "ACCESS_DENIED",
          RestApiId: { Ref: "ApiGatewayRestApi" },
        },
      },
    }
  },
  package: {individually: true},
  custom: {
    // autoswagger: {
    //   typefiles: [],
    //   swaggerPath: 'doc',
    //   generateSwaggerOnDeploy: false,
    // },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;

import type { AWS } from '@serverless/typescript';
import 'dotenv/config';

import { functions } from '@functions/index';
import { resources } from "./serverless/index";

const serverlessConfiguration: AWS = {
  service: 'products',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],
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
      PRODUCTS_TABLE: process.env.PRODUCTS_TABLE,
      STOCK_TABLE: process.env.STOCK_TABLE,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              'dynamodb:BatchWriteItem'
            ],
            Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/*',
          }
        ]
      }
    },
  },
  functions,
  resources,
  package: {individually: true},
  custom: {
    autoswagger: {
      typefiles: ['./src/models/Product.ts'],
      swaggerPath: 'doc',
      generateSwaggerOnDeploy: true,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
  }
};

module.exports = serverlessConfiguration;

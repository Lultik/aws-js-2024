import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          type: 'TOKEN',
          name: 'authorization-service-dev-basicAuthorizer',
          arn: 'arn:aws:lambda:eu-central-1:891377171169:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          identityValidationExpression: '.*',
        },
      },
    },
  ],
};

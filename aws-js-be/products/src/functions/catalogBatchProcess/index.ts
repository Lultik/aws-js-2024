import { handlerPath } from '@libs/handler-resolver';

const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn']
        },
        batchSize: 5,
      }
    }
  ],
}

export default createProduct;

import { handlerPath } from '@libs/handler-resolver';

const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products/',
        cors: true,
        responses: {
          default: {},
          201: {
            description: 'Product created',
            bodyType: 'AvailableProduct'
          },
          400: {
            description: 'Body is not valid',
            bodyType: 'string',
          },
          500: {
            description: 'Internal server error',
          }
        },
      },
    },
  ],
}

export default createProduct;

import { handlerPath } from '@libs/handler-resolver';

const getProductsById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
        request: {
          parameters: {
            paths: {id: true},
          }
        },
        responses: {
          default: {},
          200: {
            description: 'Get product by ID',
            bodyType: 'Product'
          },
          404: {
            description: 'Product not found',
          },
          500: {
            description: 'Internal server error',
          }
        },
      },
    },
  ],
}

export default getProductsById;

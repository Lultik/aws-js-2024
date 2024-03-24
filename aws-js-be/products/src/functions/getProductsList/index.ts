import { handlerPath } from '@libs/handler-resolver';

const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        responses: {
          default: {},
          200: {
            description: 'Get list of all products',
            bodyType: 'ProductList',
          },
          404: {
            description: 'Products not found',
          },
          500: {
            description: 'Internal server error',
          }
        },
      },
    },
  ],
}

export default getProductsList;

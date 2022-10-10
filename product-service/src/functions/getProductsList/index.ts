import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        documentation: {
          summary: 'Get product by product ID',
          description: 'Provide productId as a path params',
          pathParams: {
            name: 'productId',
            description: 'Product ID to search'
          },
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Get all products',
              },
              responseModels: {
                "application/json": "ProductsResponse",
              }
            },
          ],
        },
      },
    },
  ],
};

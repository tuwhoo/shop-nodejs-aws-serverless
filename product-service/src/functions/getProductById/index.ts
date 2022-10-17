import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        request: {
          parameters: { paths: { productId: true } },
        },
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
                description: 'Found product',
              },
              responseModels: {
                "application/json": "ProductResponse",
              }
            },
            {
              statusCode: 404,
              responseBody: {
                description: 'Product not found',
              },
              responseModels: {
                "application/json": "NotFoundResponse"
              }
            }
          ]
        }
      },
    },
  ],
};

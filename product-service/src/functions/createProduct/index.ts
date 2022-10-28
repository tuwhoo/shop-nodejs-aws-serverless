import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        documentation: {
          summary: 'Create product and return it',
          description: 'Take product from request body, put it in db and return result in response',
          methodResponses: [
            {
              statusCode: 200,
              requestBody: {
                description: 'A product item',
              },
              requestModels: {
                'application/json': "CreateProductRequest",
              },
              responseBody: {
                description: 'Return created product',
              },
              responseModels: {
                "application/json": "ProductResponse",
              },
            },
          ],
        },
      },
    },
  ],
};

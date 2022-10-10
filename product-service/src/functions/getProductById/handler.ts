import type { APIGatewayEvent, Handler } from "aws-lambda"
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { products } from '@mocks/data';

const getProductById: Handler = async (event: APIGatewayEvent) => {
  const product = products.find((item) => item.id === event.pathParameters.productId);  
  if (product) return formatJSONResponse(product);

  return formatJSONResponse({ message: '404 - Not Found' }, 404)
};

export const main = middyfy(getProductById);

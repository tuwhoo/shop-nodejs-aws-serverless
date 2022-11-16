import type { APIGatewayEvent, Handler } from "aws-lambda"

import * as db from '@libs/db'
import { dbTables } from "@constants/index";
import { lambdaHttpWrapper } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';


const getProductById: Handler = async (event: APIGatewayEvent) => {
  const { Item: product = {} } = await db.get(dbTables.products, 'id', event.pathParameters.productId);
  const { Item: stock = {} } = await db.get(dbTables.stocks, 'product_id', event.pathParameters.productId);

  if (product?.id) return formatJSONResponse({ ...product, count: stock?.count || 0 });

  return formatJSONResponse({ message: '404 - Not Found' }, 404)
};

export const main = lambdaHttpWrapper(getProductById);

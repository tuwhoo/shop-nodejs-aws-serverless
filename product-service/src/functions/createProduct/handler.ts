import Ajv from "ajv"
import type { APIGatewayEvent, Handler } from "aws-lambda"

import * as db from '@libs/db'
import { ProductInsert, ProductInsertSchema } from "@models/Product";
import { dbTables } from "@constants/index";
import { lambdaHttpWrapper } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { createProductUtil } from '@libs/create-product-util';

const ajv = new Ajv() 

const createProduct: Handler = async (event: APIGatewayEvent) => {
  const requestBody: ProductInsert = event?.body as any;

  const validate = ajv.compile(ProductInsertSchema)
  const valid = validate(requestBody)

  if (!valid) return formatJSONResponse({ message: 'Product data is invalid' }, 400);

  const { product, stock, availableProduct } = createProductUtil(requestBody)

  await db.put(dbTables.products, product)
  await db.put(dbTables.stocks, stock)

  return formatJSONResponse(availableProduct);
};

export const main = lambdaHttpWrapper(createProduct);

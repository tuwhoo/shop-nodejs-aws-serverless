import Ajv from "ajv"
import { v4 } from "uuid";
import type { APIGatewayEvent, Handler } from "aws-lambda"

import * as db from '@libs/db'
import { Stock } from "@models/Stock";
import { Product, ProductInsert, ProductInsertSchema } from "@models/Product";
import { dbTables } from "@constants/index";
import { lambdaWrapper } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';

const ajv = new Ajv() 

const createProduct: Handler = async (event: APIGatewayEvent) => {
  const requestBody: ProductInsert = event?.body as any;

  const validate = ajv.compile(ProductInsertSchema)
  const valid = validate(requestBody)

  if (!valid) return formatJSONResponse({ message: 'Product data is invalid' }, 400);

  const id = v4();

  const product: Product = {
    id,
    title: requestBody?.title || '',
    description: requestBody?.description || '',
    price: requestBody?.price || 0,
  };

  const stock: Stock = {
    product_id: id,
    count: requestBody?.count || 0,
  }

  await db.put(dbTables.products, product)
  await db.put(dbTables.stocks, stock)

  const result = {
    ...product,
    count: stock.count,
  }

  return formatJSONResponse(result);
};

export const main = lambdaWrapper(createProduct);

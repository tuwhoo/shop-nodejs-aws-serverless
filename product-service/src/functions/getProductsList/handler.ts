import type { Handler } from "aws-lambda"

import * as db from '@libs/db'
import { dbTables } from "@constants/index";
import { lambdaHttpWrapper } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';

const getProductList: Handler = async () => {
  const { Items: products = [] } = await db.scan(dbTables.products);
  const { Items: stocks = [] } = await db.scan(dbTables.stocks);

  const result = products?.map((product) => ({
    ...product,
    count: stocks?.find((stock) => stock.product_id === product.id)?.count || 0,
  }));

  return formatJSONResponse(result);
};

export const main = lambdaHttpWrapper(getProductList);

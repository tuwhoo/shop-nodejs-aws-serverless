import type { Handler } from "aws-lambda"
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { products } from '@mocks/data';

const getProductList: Handler = async () => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProductList);

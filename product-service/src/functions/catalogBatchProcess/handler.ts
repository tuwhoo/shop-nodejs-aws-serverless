import Ajv from "ajv"
import type { Handler, SQSEvent } from "aws-lambda"

import * as db from '@libs/db'
import * as sns from '@libs/sns'
import { dbTables } from "@constants/index";
import { lambdaWrapper } from '@libs/lambda';
import { createProductUtil } from '@libs/create-product-util';
import { ProductInsert, ProductInsertSchema } from "@models/Product";

const ajv = new Ajv()

const sendMessage = async (text: any, success = true): Promise<void> => {
  const subject = success
    ? '[SUCCESS]: Products created'
    : '[FAILED]: Products created'

  const message = typeof text !== 'string' ? JSON.stringify(text, null, 2) : text
  
  await sns.publish(subject, message)
}

const catalogBatchProcess: Handler = async (event: SQSEvent) => {
  const records  = event.Records;
  const validate = ajv.compile(ProductInsertSchema)

  const success = [];
  const failed = [];

  try {
    for (const record of records) {
      // TODO: use cache or smth to avoid duplicated messages
      const productInsertBody: ProductInsert = typeof record?.body === 'string'
        ? JSON.parse(record?.body)
        : record?.body as any

      const productInsert: ProductInsert = {
        title: productInsertBody?.title || 'Unknown title',
        description: productInsertBody?.description || '',
        price: Number(productInsertBody?.price),
        count: Number(productInsertBody?.count),
      }

      const valid = validate(productInsert)
      if (!valid) {
        console.error('Product data is invalid: ', productInsert)
        failed.push(productInsert)
        continue
      }

      const { product, stock, availableProduct } = createProductUtil(productInsert)

      await db.put(dbTables.products, product)
      await db.put(dbTables.stocks, stock)

      success.push(availableProduct)
    }
  } catch (error) {
    console.error('Failed to create products: ', error);
  }

  sendMessage({
    success: success?.length,
    products: success,
    failed
  }, success?.length > 0);
};

export const main = lambdaWrapper(catalogBatchProcess);

import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import httpHeaderNormalizer from '@middy/http-header-normalizer'

import { requestLogger } from '@libs/request-logger';
import { formatJSONResponse } from '@libs/api-gateway'; 

export const lambdaHttpWrapper = (handler) => {
  try {
    return middy(handler)
      .use(requestLogger(handler))
      .use(httpHeaderNormalizer())
      .use(middyJsonBodyParser())
  } catch (error) {
    return formatJSONResponse({ message: error }, 500)
  }
}

export const lambdaWrapper = (handler) => {
  try {
    return middy(handler)
      .use(requestLogger(handler))
  } catch (error) {
    console.error('[Finish With Error]: ', error)
  }
}

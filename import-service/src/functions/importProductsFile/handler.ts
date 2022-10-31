import { APIGatewayEvent } from 'aws-lambda';
import { lambdaHttpWrapper } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { getSignedURL } from '@libs/aws-utils';

const importProductsFile = async (event: APIGatewayEvent) => {
  const fileName: string | undefined = event.queryStringParameters?.name;
  if (!fileName) return formatJSONResponse({ message: 'Query param "name" wasn\'t provided' }, 400);

  const url = await getSignedURL(process.env.IMPORT_BUCKET_NAME, fileName, 60);
  return formatJSONResponse({ url });
};

export const main = lambdaHttpWrapper(importProductsFile);
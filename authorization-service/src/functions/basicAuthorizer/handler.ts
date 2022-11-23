import { APIGatewayAuthorizerHandler } from 'aws-lambda';
import { lambdaWrapper } from '@libs/lambda';

import { generatePolicy } from '@libs/generate-policy';


const basicAuthorizer: APIGatewayAuthorizerHandler = async (event) => {
  if (event.type !== 'TOKEN') {
    throw new Error('Unauthorized');
  }

  try {
    const creds = event.authorizationToken.split(' ')[1];
    const buff = Buffer.from(creds, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');

    const passwordFromEnv = process.env[username];

    const effect = passwordFromEnv && passwordFromEnv === password
      ? 'Allow'
      : 'Deny';

    const policy = generatePolicy(creds, event.methodArn, effect);

    return policy;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

export const main = lambdaWrapper(basicAuthorizer);

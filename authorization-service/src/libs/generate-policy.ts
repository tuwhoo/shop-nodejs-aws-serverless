import { APIGatewayAuthorizerResult } from 'aws-lambda';

export const generatePolicy = (principalId: string, resource: string, effect = 'Allow'): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: effect,
        Action: 'execute-api:Invoke',
        Resource: resource,
      },
    ],
  },
});

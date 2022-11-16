import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-stage-manager',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      IMPORT_BUCKET_NAME: '${env:IMPORT_BUCKET_NAME}',
      IMPORT_BUCKET_UPLOAD_PREFIX: '${env:IMPORT_BUCKET_UPLOAD_PREFIX}',
      IMPORT_BUCKET_PARSED_PREFIX: '${env:IMPORT_BUCKET_PARSED_PREFIX}',
      SQS_URL: { Ref: "SQSQueue" },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:ListBucket'],
            Resource: '${env:IMPORT_BUCKET_NAME_ARN}',
          },
          {
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: '${env:IMPORT_BUCKET_NAME_ARN}/*',
          },
          {
            Effect: "Allow",
            Action: ["sqs:*"],
            Resource: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
          // FifoQueue: true, // TODO: to avoid messages duplication
        },
      },
      GatewayResponse4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: { Ref: "ApiGatewayRestApi" },
        },
      },
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    stages: ['dev', 'prod'],
  },
};

module.exports = serverlessConfiguration;

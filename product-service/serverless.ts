import type { AWS } from '@serverless/typescript';

import DocumentationModels from '@models/Documentation';
import getProductById from '@functions/getProductById';
import getProductsList from '@functions/getProductsList';


const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-openapi-documentation',
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
    },
  },
  functions: { getProductsList, getProductById },
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
    documentation: {
      version: '1',
      title: 'product-service',
      description: 'Product service API',
      models: DocumentationModels,
    },
  },
};

module.exports = serverlessConfiguration;

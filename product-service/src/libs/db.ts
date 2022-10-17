import * as AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient();

export const scan = async (tableName: string) => {
  const scanResults = await db.scan({
    TableName: tableName,
  })
  .promise();

  return scanResults
}

export const get = async (tableName: string, keyName: string, keyValue: string) => {
  const getResults = await db.get({
    TableName: tableName,
    Key: { [keyName]: keyValue },
  })
  .promise();

  return getResults
}

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

export const put = async (tableName: string, item: any) => {
  const putResult = await db.put({
    TableName: tableName,
    Item: item,
  })
  .promise();

  return putResult;
}

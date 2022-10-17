require('dotenv').config({ path: __dirname + "/./../.env" });

const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/./config.json')

const productsTable = process.env.PRODUCTS_TABLE_NAME;
const stocksTable = process.env.STOCKS_TABLE_NAME;

const params = {
  RequestItems: {
    [productsTable]: [
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
            "title": "Toyota Yaris",
            "description": "Small budgetary hatchback",
            "price": 18000,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
            "title": "Hyundai i20",
            "description": "Budgetary hatchback",
            "price": 22000,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            "title": "Volkswagen Golf",
            "description": "Hatchback",
            "price": 26000,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
            "title": "Audi A4",
            "description": "Sedan",
            "price": 32000,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
            "title": "BMW X3",
            "description": "SUV",
            "price": 40000,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
            "title": "Mercedes S-Class",
            "description": "Business Sedan",
            "price": 60000,
          },
        },
      },
    ],
    [stocksTable]: [
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
            "count": 10,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
            "count": 15,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            "count": 20,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
            "count": 5,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
            "count": 10,
          },
        },
      },
      {
        PutRequest: {
          Item: {
            "product_id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
            "count": 0,
          },
        },
      },
    ],
  },
};

const db = new AWS.DynamoDB.DocumentClient();

db.batchWrite(params, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
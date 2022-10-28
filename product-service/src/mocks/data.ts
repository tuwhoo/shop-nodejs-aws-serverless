
import { Product } from "../models/Product";
import { Stock } from "../models/Stock";

export const products: Product[] = [
  {
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "title": "Toyota Yaris",
    "description": "Small budgetary hatchback",
    "price": 18000,
  },
  {
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    "title": "Hyundai i20",
    "description": "Budgetary hatchback",
    "price": 22000,
  },
  {
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    "title": "Volkswagen Golf",
    "description": "Hatchback",
    "price": 26000,
  },
  {
    "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    "title": "Audi A4",
    "description": "Sedan",
    "price": 32000,
  },
  {
    "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    "title": "BMW X3",
    "description": "SUV",
    "price": 40000,
  },
  {
    "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    "title": "Mercedes S-Class",
    "description": "Business Sedan",
    "price": 60000,
  },
];

export const stocks: Stock[] = [
  {
    "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "count": 10,
  },
  {
    "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    "count": 15,
  },
  {
    "product_id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    "count": 20,
  },
  {
    "product_id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    "count": 5,
  },
  {
    "product_id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    "count": 10,
  },
  {
    "product_id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    "count": 0,
  },
];

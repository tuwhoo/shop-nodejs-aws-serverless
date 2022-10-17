import { FromSchema } from "json-schema-to-ts";

export const PureProductSchema = {
  type: "object",
  properties: {
    title: { type: "string", default: "" },
    description: { type: "string", default: "" },
    price: { type: "number", default: 0, minimum: 0 },
  },
  required: ["title", "price"],
} as const;

export const ProductSchema = {
  ...PureProductSchema,
  properties: {
   ...PureProductSchema.properties,
   id: { type: "string" },
  },
 } as const;

export const AvailableProductSchema = {
 ...ProductSchema,
 properties: {
  ...ProductSchema.properties,
  count: { type: "number", default: 0, minimum: 0 },
 },
} as const;

export const ProductInsertSchema = {
  ...PureProductSchema,
  properties: {
   ...PureProductSchema.properties,
   count: { type: "number", default: 0, minimum: 0 },
  },
 } as const;


export type Product = FromSchema<typeof ProductSchema>;
export type ProductInsert = FromSchema<typeof ProductInsertSchema>;
export type AvailableProduct = FromSchema<typeof AvailableProductSchema>;

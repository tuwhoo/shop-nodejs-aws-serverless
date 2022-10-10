import { FromSchema } from "json-schema-to-ts";

export const ProductSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string", default: "" },
    description: { type: "string", default: "" },
    price: { type: "number", default: 0, minimum: 0 },
  },
  required: ["title", "price"],
} as const;

export type Product = FromSchema<typeof ProductSchema>;

import { FromSchema } from "json-schema-to-ts";

export const StockSchema = {
  type: "object",
  properties: {
    product_id: { type: "string" },
    count: { type: "number", default: 0, minimum: 0 },
  },
} as const;

export type Stock = FromSchema<typeof StockSchema>;

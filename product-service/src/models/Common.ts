import { FromSchema } from "json-schema-to-ts";

export const NotFoundSchema = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      default: '404 - Not Found',
    },
  },
} as const;

export type NotFound = FromSchema<typeof NotFoundSchema>;

import { ProductSchema } from './Product';
import { NotFoundSchema } from './Common'

export default [{
  name: 'NotFoundResponse',
  description: 'Not Found Response Model',
  contentType: 'application/json',
  schema: NotFoundSchema,
}, {
  name: 'ProductResponse',
  description: 'Product Response Model',
  contentType: 'application/json',
  schema: ProductSchema,
}, {
  name: 'ProductsResponse',
  description: 'Products Response Model',
  contentType: 'application/json',
  schema: {
    type: "array",
    items: ProductSchema,
  },
}];
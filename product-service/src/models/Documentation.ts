import { AvailableProductSchema } from './Product';
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
  schema: AvailableProductSchema,
}, {
  name: 'ProductsResponse',
  description: 'Products Response Model',
  contentType: 'application/json',
  schema: {
    type: "array",
    items: AvailableProductSchema,
  },
}];
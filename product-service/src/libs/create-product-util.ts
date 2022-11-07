import { v4 } from "uuid";

import { Stock } from "@models/Stock";
import { Product, ProductInsert, AvailableProduct } from "@models/Product";

type TCreateProductReturn = {
  product: Product;
  stock: Stock;
  availableProduct: AvailableProduct;
}

export const createProductUtil = (productInsert: ProductInsert): TCreateProductReturn => {
  const id = v4();

  const product: Product = {
    id,
    title: productInsert?.title || '',
    description: productInsert?.description || '',
    price: productInsert?.price || 0,
  };

  const stock: Stock = {
    product_id: id,
    count: productInsert?.count || 0,
  }

  const availableProduct = {
    ...product,
    count: stock.count,
  }

  return {
    product,
    stock,
    availableProduct,
  }
}

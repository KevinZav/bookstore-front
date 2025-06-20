import type { Product } from "../../domain";
import type { ProductResponse } from "../models";

export class ProductMapper {
  public static productResponseToEntity(response: ProductResponse) {
    const product: Product = {
      id: response.id,
      name: response.name,
      price: Number(`${response.price}`),
      quantity: response.quantity,
      sku: response.sku,
    }
    return product;
  }

  public static entityToProductResponse(product: Product) {
    const payload: Omit<ProductResponse, 'id'> = {
      name: product.name,
      price: Number(`${product.price}`),
      quantity: product.quantity,
      sku: product.sku
    };
    return payload;
  }
}
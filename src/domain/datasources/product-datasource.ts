import type { Product, ProductFilters } from "../entities";

export abstract class ProductDatasource {
  abstract create(product: Product): Promise<Product>;
  abstract getAll(): Promise<Product[]>;
  abstract getByUser(email: string): Promise<Product[]>;
  abstract getOwnProducts(): Promise<Product[]>;
  abstract getFiltered(filters: ProductFilters): Promise<Product[]>;
}
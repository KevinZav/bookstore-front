import { ProductDatasource, ProductRepository, type Product, type ProductFilters } from "../../domain";

export class ProductRepositoryImpl extends ProductRepository {
  private datasource: ProductDatasource;

  constructor(datasource: ProductDatasource) {
    super();
    this.datasource = datasource;
  }

  create(product: Product): Promise<Product> {
    return this.datasource.create(product);
  }

  getAll(): Promise<Product[]> {
    return this.datasource.getAll();
  }

  getByUser(email: string): Promise<Product[]> {
    return this.datasource.getByUser(email);
  }

  getOwnProducts(): Promise<Product[]> {
    return this.datasource.getOwnProducts();
  }

  getFiltered(filters: ProductFilters): Promise<Product[]> {
    return this.datasource.getFiltered(filters);
  }
}
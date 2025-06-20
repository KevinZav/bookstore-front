import {
  ProductDatasource,
  type Product,
  type ProductFilters,
} from "../../domain";
import { MarketConnection } from "../connection";
import { apiEnvironment } from "../environment";
import { ProductMapper } from "../mappers";
import type { ProductResponse, ProductsResponse } from "../models";

export class ProductDatasourceMarket extends ProductDatasource {
  async create(product: Product): Promise<Product> {
    const payload = ProductMapper.entityToProductResponse(product);
    const response = await MarketConnection.connect.post<ProductResponse>(
      apiEnvironment.products,
      payload
    );

    return ProductMapper.productResponseToEntity(response.data);
  }

  async getAll(): Promise<Product[]> {
    const response = await MarketConnection.connect.get<ProductsResponse>(
      apiEnvironment.allProducts
    );

    return response.data.products.map((item) =>
      ProductMapper.productResponseToEntity(item)
    );
  }

  async getByUser(email: string): Promise<Product[]> {
    const response = await MarketConnection.connect.get<ProductsResponse>(
      apiEnvironment.productsBySeller,
      {
        params: {
          email,
        },
      }
    );

    return response.data.products.map((item) =>
      ProductMapper.productResponseToEntity(item)
    );
  }

  async getOwnProducts(): Promise<Product[]> {
    const response = await MarketConnection.connect.get<ProductsResponse>(
      apiEnvironment.products
    );

    return response.data.products.map((item) =>
      ProductMapper.productResponseToEntity(item)
    );
  }

  async getFiltered(filters: ProductFilters): Promise<Product[]> {
    const response = await MarketConnection.connect.get<ProductsResponse>(
      apiEnvironment.allProducts,
      {
        params: filters
      }
    );

    return response.data.products.map((item) =>
      ProductMapper.productResponseToEntity(item)
    );
  }
}

export interface ProductResponse {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number | string;
}

export interface ProductsResponse {
  products: ProductResponse[]
}
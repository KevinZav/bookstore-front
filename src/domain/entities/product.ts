import type { User } from "./user";

export interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  user?: User;
}

export interface ProductFilters {
  search: string;
  min?: number;
  max?: number;
}
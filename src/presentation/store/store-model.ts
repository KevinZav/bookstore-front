import type { LibrarySliceProps } from "./library";
import type { ProductsSliceProps } from "./product/product-slice-model";
import type { UsersSliceProps } from "./user/user-slice-model";

export interface StoreModel {
  users: UsersSliceProps,
  products: ProductsSliceProps
  library: LibrarySliceProps
}
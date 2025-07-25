import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./user";
import { ProductsSlice } from "./product/product-slice";
import { LibrarySlice } from "./library";

export const store = configureStore({
  reducer: {
    users: UsersSlice.reducer,
    products: ProductsSlice.reducer,
    library: LibrarySlice.reducer
  }
});
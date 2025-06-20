import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./user";
import { ProductsSlice } from "./product/product-slice";

export const store = configureStore({
  reducer: {
    users: UsersSlice.reducer,
    products: ProductsSlice.reducer
  }
});
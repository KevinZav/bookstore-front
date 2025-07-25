import { configureStore } from "@reduxjs/toolkit";
import { UsersSlice } from "./user";
import { LibrarySlice } from "./library";

export const store = configureStore({
  reducer: {
    users: UsersSlice.reducer,
    library: LibrarySlice.reducer
  }
});
import { createSlice } from "@reduxjs/toolkit";
import type { ProductsSliceProps } from "./product-slice-model";

const initialState: ProductsSliceProps = {
  all: {
    status: "initial",
    data: [],
  },
  one: {
    status: "initial",
  },
};

export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getAll: (state, { payload }) => {
      state.all.status = "success";
      state.all.data = payload;
    },
    getAllError: (state) => {
      state.all.data = [];
      state.all.status = "error";
    },
    getAllInitial: (state) => {
      state.all.data = [];
      state.all.status = "initial";
    },
    create: (state, { payload }) => {
      state.one.status = "success";
      state.all.data.push(payload);
    },
    createError: (state) => {
      state.one.status = "error";
    },
    createInitial: (state) => {
      state.one.status = "initial";
    },
  },
});

export const {
  getAll,
  getAllError,
  getAllInitial,
  create,
  createError,
  createInitial,
} = ProductsSlice.actions;

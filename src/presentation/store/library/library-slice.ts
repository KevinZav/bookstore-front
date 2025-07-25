import { createSlice } from "@reduxjs/toolkit";
import type { LibrarySliceProps } from "./library-slice-model";

const initialState: LibrarySliceProps = {
  authors: {
    status: "initial",
    data: [],
  },
  books: {
    status: "initial",
    data: [],
  },
};

export const LibrarySlice = createSlice({
  name: "Library",
  initialState,
  reducers: {
    getAuthors: (state, { payload }) => {
      state.authors.status = "success";
      state.authors.data = payload;
    },
    createAuthor: (state, { payload }) => {
      state.authors.data.push(payload);
    },
    errorAuthors: (state) => {
      state.authors.status = "error";
      state.authors.data = [];
    },
    clearAuthors: (state) => {
      state.authors.status = "initial";
      state.authors.data = [];
    },
    loadingAuthors: (state) => {
      state.authors.status = 'loading';
      state.authors.data = [];
    },
    getBooks: (state, { payload }) => {
      state.books.status = "success";
      state.books.data = payload;
    },
    createBook: (state, { payload }) => {
      state.books.status = "success";
      state.books.data = payload;
    },
    errorBooks: (state) => {
      state.books.status = "error";
      state.books.data = [];
    },
    clearBooks: (state) => {
      state.books.status = "initial";
      state.books.data = [];
    },
    creatingBook: (state) => {
      state.books.status = 'loading';
    }
  },
});

export const {
  getAuthors,
  createAuthor,
  errorAuthors,
  clearAuthors,
  loadingAuthors,
  getBooks,
  createBook,
  errorBooks,
  clearBooks,
  creatingBook,
} = LibrarySlice.actions;

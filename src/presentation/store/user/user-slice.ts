import { createSlice } from "@reduxjs/toolkit";
import type { UsersSliceProps } from "./user-slice-model";

const initialState: UsersSliceProps = {
  logged: {
    status: 'initial',
  },
  all: {
    status: 'initial',
    data: []
  }
}

export const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.logged.status = 'success';
      state.logged.data = payload;
    },
    sign: (state, { payload }) => {
      state.logged.status = 'success';
      state.logged.data = payload;
    },
    loginError: (state) => {
      state.logged.status = 'error';
      state.logged.data = undefined;
    },
    logout: (state) => {
      state.logged.status = 'initial';
      state.logged.data = undefined;
    },
    getAll: (state, { payload }) => {
      state.all.status = 'success';
      state.all.data = payload;
    },
    loadingAll: (state) => {
      state.all.status = 'loading';
    }
  }
});

export const { login, sign, loginError, logout, getAll, loadingAll } = UsersSlice.actions;
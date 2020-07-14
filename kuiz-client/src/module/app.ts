import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export type AppState = {};

export const initialState: AppState = {};

export default createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<any>): AppState => {
      const returns = { ...state, ...action.payload.auth };
      return returns;
    },
  },
});

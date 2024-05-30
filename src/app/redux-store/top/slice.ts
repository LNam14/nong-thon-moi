import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  topList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  topList: null,
  originList: null,
  status: "idle",
};

export const getNewsTop = createAsyncThunk("top/get", async () => {
  try {
    const response = await axios.get("/api/home/get/get-top");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});
export const topSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsTop.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsTop.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getNewsTop.rejected, (state, action) => {
        state.status = "failed";
        state.topList = null;
        state.originList = null;
      });
  },
});

export const getTopList = (state: RootState) => state.topState.topList;
export default topSlice.reducer;

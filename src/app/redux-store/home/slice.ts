import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  homeList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  homeList: null,
  originList: null,
  status: "idle",
};

export const getAllNews = createAsyncThunk("home/get", async () => {
  try {
    const response = await axios.get("/api/home/get/get-left");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});
export const homeSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.status = "failed";
        state.homeList = null;
        state.originList = null;
      });
  },
});

export const getHomeList = (state: RootState) => state.homeState.homeList;
export default homeSlice.reducer;

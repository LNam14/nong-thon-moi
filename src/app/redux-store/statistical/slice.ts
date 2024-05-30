import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  statisticalList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  statisticalList: null,
  originList: null,
  status: "idle",
};

export const getStatistical = createAsyncThunk("statistical/get", async () => {
  try {
    const response = await axios.get("/api/statistical/get");
    return response.data;
  } catch (error: any) {

    console.log("error " , error);
    throw error.response?.data || error.message;
  }
});
export const StatisticalSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatistical.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStatistical.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statisticalList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getStatistical.rejected, (state, action) => {
        state.status = "failed";
        state.statisticalList = null;
        state.originList = null;
      });
  },
});

export const getStatisticalList = (state: RootState) => state.statisticalState.statisticalList;
export default StatisticalSlice.reducer;

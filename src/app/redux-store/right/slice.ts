import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  rightList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  rightList: null,
  originList: null,
  status: "idle",
};

export const getNewsRight = createAsyncThunk("right/get", async () => {
  try {
    const response = await axios.get("/api/home/get/get-right");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});
export const rightSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsRight.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsRight.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rightList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getNewsRight.rejected, (state, action) => {
        state.status = "failed";
        state.rightList = null;
        state.originList = null;
      });
  },
});

export const getRightList = (state: RootState) => state.rightState.rightList;
export default rightSlice.reducer;

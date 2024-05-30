import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
interface AuthenticationState {
  monthList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  monthList: null,
  originList: null,
  status: "idle",
};

export const getMonth = createAsyncThunk("month/get", async () => {
  try {
    const response = await axios.get("/api/month/get/get-month");
console.log("wtf",response.data);

    return response.data;
  } catch (error: any) {

    console.log("error " , error);
    throw error.response?.data || error.message;
  }
});
export const monthSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getMonth.rejected, (state, action) => {
        state.status = "failed";
        state.monthList = null;
        state.originList = null;
      });
  },
});

export const getMonthList = (state: RootState) => state.monthState.monthList;
export default monthSlice.reducer;

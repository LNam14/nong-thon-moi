import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  logoList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  logoList: null,
  originList: null,
  status: "idle",
};

export const getAllLogo = createAsyncThunk("logo/get", async () => {
  try {
    const response = await axios.get("/api/layouts/get/get-logo");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});
export const updateLogo = createAsyncThunk("logo/update", async (data: any) => {
  const response = await axios.post("/api/layouts/update", data, {});
  console.log("xxx", response.data);

  return response.data;
});
export const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllLogo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllLogo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logoList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getAllLogo.rejected, (state, action) => {
        state.status = "failed";
        state.logoList = null;
        state.originList = null;
      });
  },
});

export const getLogoList = (state: RootState) => state.logoState.logoList;
export default logoSlice.reducer;

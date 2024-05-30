import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  bannerList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  bannerList: null,
  originList: null,
  status: "idle",
};

export const getAllBanner = createAsyncThunk("banner/get", async () => {
  try {
    const response = await axios.get("/api/layouts/get/get-banner");

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});

export const createBanner = createAsyncThunk(
  "banner/create",
  async (data: any) => {
    try {
      const response = await axios.post("/api/layouts/create/create-banner", {
        ...data,
      });
      console.log("response.data1", response.data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);
export const deleteBanner = createAsyncThunk(
  "banner/delete",
  async (ID: any) => {
    try {
      const response = await axios.post(
        "/api/layouts/delete/delete-banner",
        ID,
        {}
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bannerList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getAllBanner.rejected, (state, action) => {
        state.status = "failed";
        state.bannerList = null;
        state.originList = null;
      })
      .addCase(createBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bannerList = action.payload;
        state.originList = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.status = "failed";
        state.bannerList = null;
        state.originList = null;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bannerList = action.payload;
        state.originList = action.payload;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.status = "failed";
        state.bannerList = null;
        state.originList = null;
      });
  },
});

export const getBannerList = (state: RootState) => state.bannerState.bannerList;
export default bannerSlice.reducer;

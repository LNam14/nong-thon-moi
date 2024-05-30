import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  newsList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  newsList: null,
  originList: null,
  status: "idle",
};

export const updateNewsView = createAsyncThunk(
  "news/update",
  async (data: any) => {
    try {
      const response = await axios.post(
        "/api/news/update/update-view",
        data,
        {}
      );

      console.log("Server response:", response.data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);
function removeAccents(str: any) {
  if (str === undefined || str === null) {
    return "";
  }
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(updateNewsView.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNewsView.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newsList = action.payload;
        state.originList = action.payload;
      })
      .addCase(updateNewsView.rejected, (state, action) => {
        state.status = "failed";
        state.newsList = null;
        state.originList = null;
      });
  },
});

export const getViewList = (state: RootState) => state.viewState.newsList;
export default newsSlice.reducer;

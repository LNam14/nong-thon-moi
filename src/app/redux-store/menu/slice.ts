// menuSubSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  menuList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  menuList: null,
  originList: null,
  status: "idle",
};

export const getMenu = createAsyncThunk(
  "menu/get",
  async () => {
    try {
      const response = await axios.get("/api/category/get/get-menu", {
      });
console.log("response.data", response.data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);
export const menuSlice = createSlice({
  name: "menuSub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(getMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menuList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.status = "failed";
        state.menuList = null;
        state.originList = null;
      });
  },
});

export const getMenuList = (state: RootState) =>
  state.menuState.menuList;
export default menuSlice.reducer;

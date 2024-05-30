// loginSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
interface AuthenticationState {
  loginList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
  token: string | null;
}

const initialState: AuthenticationState = {
  loginList: null,
  originList: null,
  status: "idle",
  token: null,
};

export const loginAsync = createAsyncThunk(
  "login/login",
  async ({ data }: { data: any }) => {
    try {
      const response = await axios.post("/api/login", {
        ...data,
      });
      if (response.data.token) {
        setCookie("token", response.data.token);
        // Other logic
      }

      console.log("response.data.token", response.data.token);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginList = action.payload;
        state.originList = action.payload;
        state.token = action.payload?.id_token || null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.loginList = null;
        state.originList = null;
      });
  },
});

export const getLoginList = (state: RootState) => state.loginState.loginList;
export const getToken = (state: RootState) => state.loginState.token;
export default loginSlice.reducer;

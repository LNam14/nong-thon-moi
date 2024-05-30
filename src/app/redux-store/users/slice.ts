// userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
interface AuthenticationState {
  userList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  userList: null,
  originList: null,
  status: "idle",
};

export const getUser = createAsyncThunk("login/login", async () => {
  try {
    const response = await axios.get("/api/getUsers", {});

    console.log("response.data.token", response.data.token);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});

export const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.userList = null;
        state.originList = null;
      });
  },
});

export const getUserList = (state: RootState) => state.userState.userList;
export default userSlice.reducer;

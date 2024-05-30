// categorySubSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  categorySubList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  categorySubList: null,
  originList: null,
  status: "idle",
};

export const createCategorySub = createAsyncThunk(
  "categorySub/create",
  async ({ dataSub }: { dataSub: any }) => {
    try {
      const response = await axios.post(
        "/api/category/create/create-sub",
        {
          ...dataSub,
        }
      );
      console.log("esponse.data",response.data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);
export const getCategorySub = createAsyncThunk(
  "categorySub/get",
  async ({ data }: { data: any }) => {
    try {
      const response = await axios.post("/api/category/get/get-category-sub", {
        ...data,
      });

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const deleteCategorySub = createAsyncThunk(
  "categorySub/delete",
  async (ID: any) => {
    try {
      const response = await axios.post("/api/category/delete/delete-sub", ID, {});

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const updateCategorySub = createAsyncThunk(
  "categorySub/update",
  async (data: any) => {
    try {
      const response = await axios.post("/api/categorySub/update", data, {});

      console.log("Server response:", response.data);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);
export const categorySubSlice = createSlice({
  name: "categorySub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategorySub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategorySub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categorySubList = action.payload;
        state.originList = action.payload;
      })
      .addCase(createCategorySub.rejected, (state, action) => {
        state.status = "failed";
        state.categorySubList = null;
        state.originList = null;
      })
      .addCase(deleteCategorySub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategorySub.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategorySub.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getCategorySub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategorySub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categorySubList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getCategorySub.rejected, (state, action) => {
        state.status = "failed";
        state.categorySubList = null;
        state.originList = null;
      })
      .addCase(updateCategorySub.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategorySub.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCategorySub.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const getCategorySubList = (state: RootState) =>
  state.categorySubState.categorySubList;
export default categorySubSlice.reducer;

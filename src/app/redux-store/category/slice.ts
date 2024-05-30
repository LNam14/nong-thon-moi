// categorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
interface AuthenticationState {
  categoryList: any;
  originList: any;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: AuthenticationState = {
  categoryList: null,
  originList: null,
  status: "idle",
};

export const createCategory = createAsyncThunk(
  "category/create",
  async ({ data }: { data: any }) => {
    try {
      const response = await axios.post(
        "/api/category/create",
        {
          ...data,
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const getCategory = createAsyncThunk("category/get", async () => {
  try {
    const response = await axios.get(
      "/api/category/get/get-all"
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
});
export const getCategoryByName = createAsyncThunk(
  "category/get-by-name",
  async ({ data }: { data: any }) => {
    try {
      const response = await axios.post("/api/category/get/get-by-name", {
        ...data,
      });

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (ID: any) => {
    try {
      const response = await axios.post("/api/category/delete", ID, {});

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: any) => {
    try {
      const response = await axios.post("/api/category/update", data, {});

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
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryList = action.payload;
        state.originList = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.categoryList = null;
        state.originList = null;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryList = action.payload;
        state.originList = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.categoryList = null;
        state.originList = null;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const getCategoryList = (state: RootState) =>
  state.categoryState.categoryList;
export default categorySlice.reducer;

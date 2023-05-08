import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const dataRef = collection(db, "brands");

export const getBrandsData = createAsyncThunk(
  "brands/getBrandsData",
  async () => {
    const querySnapshot = await getDocs(dataRef);
    const dataArray = querySnapshot.docs.map((doc) => doc.data());
    return dataArray;
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrandsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getBrandsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectBrandsData = (state) => state.brands.data;
export const selectBrandsStatus = (state) => state.brands.status;
export const selectBrandsError = (state) => state.brands.error;

export default brandsSlice.reducer;

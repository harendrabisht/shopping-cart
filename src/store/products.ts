import { createSlice, createAction } from "@reduxjs/toolkit";

interface ProductsPayload {
  data: any[];
  total: number;
  limit: number;
  skip: number;
}

export const updateProducts = createAction<ProductsPayload>(
  "update/products-list"
);

interface ProductState {
  data: any[];
  total: number;
  limit: number;
  skip: number;
}

const initialState: ProductState = {
  data: [],
  total: 0,
  limit: 30,
  skip: 0,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProducts, (state, action) => {
      const { data, total, limit, skip } = action.payload;
      state.data = data;
      state.total = total;
      state.limit = limit;
      state.skip = skip;
    });
  },
});

export default productSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
/** initial state */
const initialState = {
  user: null,
  products: { data: [] },
  cart: {
    products: [],
    total: 0,
    totalQuantity: 0,
    id: null,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateCart: (state, action) => {
      const { products, total, totalQuantity, id } = action.payload;
      state.cart = {
        products,
        total,
        totalQuantity,
        id,
      };
    },
    mergeCart: (state, action) => {
      const cart = state.cart;
      const { products } = action.payload;
      const updatedProducts: any = [...cart.products, ...products];
      const totalQuantity: number = updatedProducts.reduce(
        (acc: number, product: any) => acc + product.quantity,
        0
      );
      const totalPrice: number = updatedProducts.reduce(
        (acc: number, product: any) => acc + product.price * product.quantity,
        0
      );
      state.cart = {
        ...cart,
        products: updatedProducts,
        total: totalPrice,
        totalQuantity: totalQuantity,
      };
    },
  },
});

export const { updateUser, updateProducts, updateCart, mergeCart } =
  commonSlice.actions;
export default commonSlice.reducer;

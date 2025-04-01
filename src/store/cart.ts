import { createSlice, createAction } from "@reduxjs/toolkit";
import { Product } from "./products";

type CartPayload = {
  products: any[];
  total: number;
  totalQuantity: number;
  id: number | null;
};

export const updateCart = createAction<CartPayload>("add/item/cart");
export const mergeCart = createAction<CartPayload>("merge/item/cart");

const initialState: CartPayload = {
  products: [],
  total: 0,
  totalQuantity: 0,
  id: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCart, (state, action) => {
      const { id } = state;
      if (id) {
        const { products } = action.payload;
        const updatedProducts: Product[] = [...state.products, ...products];
        const totalQuantity: number = updatedProducts.reduce(
          (acc: number, product: any) => acc + product.quantity,
          0
        );
        const totalPrice: number = updatedProducts.reduce(
          (acc: number, product: any) => acc + product.price * product.quantity,
          0
        );

        state.products = updatedProducts;
        state.total = totalPrice;
        state.totalQuantity = totalQuantity;
      } else {
        const { products, id, total, totalQuantity } = action.payload;
        state.products = products;
        state.id = id;
        state.total = total;
        state.totalQuantity = totalQuantity;
      }
    });
  },
});

export default cartSlice.reducer;

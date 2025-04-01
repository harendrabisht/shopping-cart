import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import productReducer from "./products";
import userReducer from "./user";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  user: userReducer,
});
export default rootReducer;

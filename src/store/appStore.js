import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userInfoReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    userinfo: userInfoReducer,
  },
});

export default appStore;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "./login/slice";
import userReducer from "./users/slice";
import categoryReducer from "./category/slice";
import categorySubReducer from "./category-sub/slice";
import newsReducer from "./news/slice";
import homeReducer from "./home/slice";
import logoRuducer from "./logo/slice";
import bannerReducer from "./banner/slice";
import rightReducer from "./right/slice";
import topReducer from "./top/slice";
import viewReducer from "./update-view/slice";
import menuReducer from "./menu/slice";
import statisticalReducer from "./statistical/slice"
import monthReducer from "./statistical/get-30days/slice"
export const store = configureStore({
  reducer: {
    loginState: loginReducer,
    userState: userReducer,
    categoryState: categoryReducer,
    categorySubState: categorySubReducer,
    newsState: newsReducer,
    homeState: homeReducer,
    bannerState: bannerReducer,
    logoState: logoRuducer,
    rightState: rightReducer,
    topState: topReducer,
    viewState: viewReducer,
    menuState: menuReducer,
    statisticalState: statisticalReducer,
    monthState: monthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

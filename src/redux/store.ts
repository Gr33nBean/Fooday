import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accountSlice";
import globalModalReducer from "./features/globalModalSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    globalModal: globalModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

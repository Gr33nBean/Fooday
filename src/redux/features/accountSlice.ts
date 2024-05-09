import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  isLogin: boolean;
}

const initialState: AccountState = {
  isLogin: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    // decrement
    // reset
  },
});

export const selectIsLogin = (state: { account: AccountState }) =>
  state.account.isLogin;

export const { setIsLogin } = accountSlice.actions;
export default accountSlice.reducer;

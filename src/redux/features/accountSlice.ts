import { User } from "@/services/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  signedUser?: User;
}

const initialState: AccountState = {
  signedUser: undefined,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignedUser(state, action: PayloadAction<User | undefined>) {
      state.signedUser = action.payload;
    },
  },
});

export const selectSignedUser = (state: { account: AccountState }) =>
  state.account.signedUser;

export const { setSignedUser } = accountSlice.actions;
export default accountSlice.reducer;

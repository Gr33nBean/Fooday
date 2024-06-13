import { User } from "@/services/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  signedUser?: User;
  uid?: string;
  selectDate: Date;
}

const initialState: AccountState = {
  signedUser: undefined,
  uid: undefined,
  selectDate: new Date(),
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSignedUser(state, action: PayloadAction<User | undefined>) {
      state.signedUser = action.payload;
    },

    setUid(state, action: PayloadAction<string | undefined>) {
      state.uid = action.payload;
    },

    setSelectDate(state, action: PayloadAction<Date>) {
      state.selectDate = action.payload;
    },
  },
});

export const selectSignedUser = (state: { account: AccountState }) =>
  state.account.signedUser;

export const selectUid = (state: { account: AccountState }) =>
  state.account.uid;

export const selectSelectDate = (state: { account: AccountState }) =>
  state.account.selectDate;

export const { setSignedUser, setUid, setSelectDate } = accountSlice.actions;
export default accountSlice.reducer;

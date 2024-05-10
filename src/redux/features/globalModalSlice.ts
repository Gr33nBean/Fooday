import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isOpenCreateModal: boolean;
}

const initialState: GlobalState = {
  isOpenCreateModal: false,
};

const globalModalSlice = createSlice({
  name: "globalModal",
  initialState,
  reducers: {
    setIsOpenCreateModal(state, action: PayloadAction<boolean>) {
      state.isOpenCreateModal = action.payload;
    },
  },
});

export const selectIsOpenCreateModal = (state: { globalModal: GlobalState }) =>
  state.globalModal.isOpenCreateModal;

export const { setIsOpenCreateModal } = globalModalSlice.actions;
export default globalModalSlice.reducer;

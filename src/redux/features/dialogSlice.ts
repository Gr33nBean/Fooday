import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  isOpenViewImage: {
    index: number;
    images: string[];
  };
  isOpenCreate: boolean;
  isLoading: boolean;
  isOpenCreateComment: number;
  isCreatePostInEvent: number;
}

const initialState: DialogState = {
  isOpenViewImage: {
    index: -1,
    images: [],
  },
  isOpenCreate: false,
  isLoading: false,
  isOpenCreateComment: -1,
  isCreatePostInEvent: -1,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpenViewImage(
      state,
      action: PayloadAction<{
        index: number;
        images: string[];
      }>
    ) {
      state.isOpenViewImage = action.payload;
    },

    setIsOpenCreate(state, action: PayloadAction<boolean>) {
      state.isOpenCreate = action.payload;
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setIsOpenCreateComment(state, action: PayloadAction<number>) {
      state.isOpenCreateComment = action.payload;
    },

    setIsCreatePostInEvent(state, action: PayloadAction<number>) {
      state.isCreatePostInEvent = action.payload;
    },
  },
});

export const selectIsOpenViewImage = (state: { dialog: DialogState }) =>
  state.dialog.isOpenViewImage;

export const selectIsOpenCreate = (state: { dialog: DialogState }) =>
  state.dialog.isOpenCreate;

export const selectIsLoading = (state: { dialog: DialogState }) =>
  state.dialog.isLoading;

export const selectIsOpenCreateComment = (state: { dialog: DialogState }) =>
  state.dialog.isOpenCreateComment;

export const selectIsCreatePostInEvent = (state: { dialog: DialogState }) =>
  state.dialog.isCreatePostInEvent;

export const {
  setIsOpenViewImage,
  setIsOpenCreate,
  setIsLoading,
  setIsOpenCreateComment,
  setIsCreatePostInEvent,
} = dialogSlice.actions;
export default dialogSlice.reducer;

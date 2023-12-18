'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddIdeaState {
  isAddIdeaOpened: boolean;

}

const initialState: AddIdeaState = {
  isAddIdeaOpened: false,
}

const addPostSlice = createSlice({
  name: 'addIdea',
  initialState,
  reducers: {
    handleAddIdeaClicked(state, action: PayloadAction<{ isAddIdeaOpened: boolean }>) {
      state.isAddIdeaOpened = action.payload.isAddIdeaOpened;
    },
  },
})

export const { handleAddIdeaClicked } = addPostSlice.actions
export default addPostSlice.reducer
export type { AddIdeaState };

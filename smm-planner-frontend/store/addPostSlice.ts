'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface addPost {
    isAddPostOpened: boolean
    openedDate: Date | undefined
}

interface addPostState {
    isAddPostOpened: boolean
    openedDate: Date | undefined
} 

const initialState: addPostState = {
    isAddPostOpened: false,
    openedDate: undefined
}

const addPostSlice = createSlice({
    name: 'addPost',
    initialState,
        reducers: {
            handleAddPostClicked(state, action: PayloadAction<{ isAddPostOpened: boolean, openedDate?: Date }>) {
                state.isAddPostOpened = action.payload.isAddPostOpened
                if (action.payload.openedDate) {
                    state.openedDate = action.payload.openedDate
                }
            }
        }
})

export const {handleAddPostClicked} = addPostSlice.actions
export default addPostSlice.reducer
export type { addPostState };
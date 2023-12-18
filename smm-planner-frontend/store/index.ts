'use client'

import { configureStore } from "@reduxjs/toolkit";
import addPostSlice from "./addPostSlice";
import addIdeaSlice from "./addIdeaSlice";

const store = configureStore({
    reducer: {
        addPost: addPostSlice,
        addIdea: addIdeaSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
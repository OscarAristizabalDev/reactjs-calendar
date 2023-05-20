import { useDispatch } from "react-redux";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import { uiSlice } from ".";

 export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer
    }
 });

 // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
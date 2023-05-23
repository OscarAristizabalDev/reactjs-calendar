import { useDispatch } from "react-redux";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import { calendarSlice, uiSlice } from ".";

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // debo leer sobre los middleware
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
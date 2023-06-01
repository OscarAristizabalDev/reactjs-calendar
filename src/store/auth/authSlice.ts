import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Auth, User } from '../../auth';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        errorMessage: '',
        status: 'checking', // authenticated, not-authenticated
        user: {},

    } as Auth,
    reducers: {
        onChecking: (state) => {

            state.status = 'checking';
            state.user = {
                email: '',
                name: '',
                password: ''
            };
            state.errorMessage = '';
        },
        onLogin: (state, action: PayloadAction<User>) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = ''
        }
    }
});

// Action creators are generated for each case reducer function
export const { onChecking } = authSlice.actions;
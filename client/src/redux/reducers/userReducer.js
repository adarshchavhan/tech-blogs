import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: null,
    message: null,
    error: null,
    isAuth: false
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('loginRequest', (state) => {
            state.loading = true;
        })
        .addCase('signupRequest', (state) => {
            state.loading = true;
        })
        .addCase('logoutRequest', (state) => {
            state.loading = true;
        })
        .addCase('loadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('updateUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('updatePasswordRequest', (state) => {
            state.loading = true;
        });

    builder
        .addCase('loginSuccess', (state, action) => {
            state.loading = false;
            state.currentUser = action.user;
            state.message = action.message;
            state.isAuth = true;
        })
        .addCase('signupSuccess', (state, action) => {
            state.loading = false;
            state.currentUser = action.user;
            state.message = action.message;
            state.isAuth = true;
        })
        .addCase('logoutSuccess', (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.message = action.payload;
            state.isAuth = false;
        })
        .addCase('loadUserSuccess', (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.isAuth = true;
        })
        .addCase('updateUserSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('updatePasswordSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });

    builder
        .addCase('loginFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('signupFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('logoutFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('loadUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('updateUserFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('updatePasswordFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    builder
        .addCase('clearError', (state) => {
            state.loading = false;
            state.message = null;
            state.error = null;
        });
});
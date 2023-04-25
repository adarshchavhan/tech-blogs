import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    currentPost: null,
    loading: null,
    message: null,
    error: null
}

export const postReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('getCategoriesRequest', (state) => {
            state.loading = true;
        })
        .addCase('getPostRequest', (state) => {
            state.loading = true;
        })
        .addCase('addPostRequest', (state) => {
            state.loading = true;
        })
        .addCase('updatePostRequest', (state) => {
            state.loading = true;
        })
        .addCase('deletePostRequest', (state) => {
            state.loading = true;
        });

    builder
        .addCase('getCategoriesSuccess', (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase('getPostSuccess', (state, action) => {
            state.loading = false;
            state.currentPost = action.payload;
        })
        .addCase('addPostSuccess', (state, action) => {
            state.loading = false;
            state.currentPost = action.post;
            state.message = action.message;
        })
        .addCase('updatePostSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('deletePostSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        });

    builder
        .addCase('getCategoriesFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('getPostFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('addPostFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('updatePostFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('deletePostFailure', (state, action) => {
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
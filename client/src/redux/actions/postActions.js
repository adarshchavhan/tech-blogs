import axios from 'axios';

export const getCategories = () => async(dispatch) => {
    try {
        dispatch({
            type:'getCategoriesRequest'
        });
        const {data} = await axios.get('/posts/categories');

        dispatch({
            type: 'getCategoriesSuccess',
            payload: data.categories
        });

    } catch (error) {
        dispatch({
            type: 'getCategoriesFailure',
            payload: error.response?.data.message
        });
    }
}

export const getPost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type:'getPostRequest'
        });
        const {data} = await axios.get(`/posts/find/${postId}`);

        dispatch({
            type: 'getPostSuccess',
            payload: data.post
        });

    } catch (error) {
        dispatch({
            type: 'getPostFailure',
            payload: error.response?.data.message
        });
    }
}

export const addPost = (postData) => async(dispatch) => {
    try {
        dispatch({
            type:'addPostRequest'
        });
        const {data} = await axios.post(`/posts/new`, postData);

        dispatch({
            type: 'addPostSuccess',
            post: data.post,
            message: data.message
        });

    } catch (error) {
        dispatch({
            type: 'addPostFailure',
            payload: error.response?.data.message
        });
    }
}

export const updatePost = (postId, postData) => async(dispatch) => {
    try {
        dispatch({
            type:'updatePostRequest'
        });
        const {data} = await axios.put(`/posts/${postId}`, postData);

        dispatch({
            type: 'updatePostSuccess',
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: 'updatePostFailure',
            payload: error.response?.data.message
        });
    }
}

export const deletePost = (postId) => async(dispatch) => {
    try {
        dispatch({
            type:'deletePostRequest'
        });
        const {data} = await axios.delete(`/posts/${postId}`);

        return dispatch({
            type: 'deletePostSuccess',
            payload: data.message
        });

    } catch (error) {
        return dispatch({
            type: 'deletePostFailure',
            payload: error.response?.data.message
        });
    }
}

export const clearError = () => async(dispatch) => {
    dispatch({
        type: 'clearError'
    });
}
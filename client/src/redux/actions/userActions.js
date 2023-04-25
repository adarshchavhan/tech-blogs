import axios from 'axios';
import { toast } from 'react-hot-toast';

export const login = (userData) => async(dispatch) => {
    try {
        dispatch({
            type:'loginRequest'
        });
        const {data} = await axios.post(`/auth/login`, userData);
        dispatch({
            type: 'loginSuccess',
            user: data.user,
            message: data.message
        });

    } catch (error) {
        dispatch({
            type: 'loginFailure',
            payload: error.response?.data.message
        });
    }
}

export const signup = (userData) => async(dispatch) => {
    try {
        dispatch({
            type:'signupRequest'
        });
        const {data} = await axios.post(`/auth/signup`, userData);

        dispatch({
            type: 'signupSuccess',
            user: data.user,
            message: data.message
        });

    } catch (error) {
        dispatch({
            type: 'signupFailure',
            payload: error.response?.data.message
        });
    }
}

export const logout = () => async(dispatch) => {
    try {
        dispatch({
            type:'logoutRequest'
        });
        const {data} = await axios.post(`/auth/logout`);

        dispatch({
            type: 'logoutSuccess',
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: 'logoutFailure',
            payload: error.response?.data.message
        });
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type:'loadUserRequest'
        });
        const {data} = await axios.get(`/users/me`);

        dispatch({
            type: 'loadUserSuccess',
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: 'loadUserFailure',
            payload: error.response?.data.message
        });
    }
}

export const updateUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type:'updateUserRequest'
        });
        const {data} = await axios.put(`/users/me`, userData);

        dispatch({
            type: 'updateUserSuccess',
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: 'updateUserFailure',
            payload: error.response?.data.message
        });
    }
}

export const updatePassword = (passwordData) => async(dispatch) => {
    try {
        dispatch({
            type:'updatePasswordRequest'
        });
        const {data} = await axios.put(`/users/password`, passwordData);

        dispatch({
            type: 'updatePasswordSuccess',
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: 'updatePasswordFailure',
            payload: error.response?.data.message
        });
    }
}

export const clearError = () => async(dispatch) => {
    dispatch({
        type: 'clearError'
    });
}
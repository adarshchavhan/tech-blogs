import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import { postReducer } from './reducers/postReducer';
import { userReducer } from './reducers/userReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    user: userReducer,
    post: postReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);
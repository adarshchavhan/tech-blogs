import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.scss'
import {axiosConfig} from './utils/axiosConfig.js'
import {Provider} from 'react-redux';
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

axiosConfig();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
);
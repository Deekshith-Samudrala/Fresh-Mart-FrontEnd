import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import Cartslice from './Redux/Cartslice';
import Userauthslice from './Redux/Userauthslice';
import adminDetailsSlice from './Redux/adminAuthSlice';

let rootReducer = combineReducers({
  Cartslice,Userauthslice,adminDetailsSlice
})

let store = configureStore({
    reducer : rootReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



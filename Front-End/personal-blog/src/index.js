import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/store';
import API from './API';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(API.fetchPost());
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer position="bottom-right" />
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


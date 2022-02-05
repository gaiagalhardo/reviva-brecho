import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from './app/layouts/Default/Default.layout';
import 'antd/dist/antd.css';
import './core/import.css'
import reportWebVitals from './reportWebVitals';
import Routes from './app/routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DefaultLayout>
        <Routes />
      </DefaultLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

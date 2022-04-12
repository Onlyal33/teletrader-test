/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import initialize from './initialize';
import reportWebVitals from './reportWebVitals';

const run = async () => {
  const App = await initialize();
  const container = document.getElementById('root');

  createRoot(container)
    .render(
      <React.StrictMode>
        {App}
      </React.StrictMode>,
    );
};

run();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

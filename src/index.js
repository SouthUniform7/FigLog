import React from 'react';
import ReactDOM from 'react-dom';
import { FigLog } from './components/figlog'
import reportWebVitals from './reportWebVitals';

// Import styles
import './styles/styles.css'

ReactDOM.render(
  <React.StrictMode>
    <FigLog />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

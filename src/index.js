import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// window.kuromojin = {
//   dicPath: "/JapaneseTextAnalyser/dict"
// };
window.kuromojin = {
  dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict"
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

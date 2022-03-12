import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/index";
//@ts-ignore
window.kuromojin = {
  dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict",
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

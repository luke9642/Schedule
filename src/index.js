import React from "react";
import ReactDOM from "react-dom";
import App from "./front/App";
import './front/index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

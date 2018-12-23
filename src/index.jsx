import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/styles.sass';
import * as serviceWorker from './serviceWorker';
import App from './app';
import AppState from "./stores/AppState";


ReactDOM.render(
  <Provider appState={AppState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from './app/index';
import appState from './stores/AppState';
import loaderStore from './stores/LoaderStore';

import './index.css';

const stores = { appState, loaderStore };

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

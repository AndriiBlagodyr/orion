import React from 'react';
import ReactDOM from 'react-dom';
// import { createClient, Provider } from '@urql/core';
// import {createClient, Provider} from 'urql';
import {Provider} from 'react-redux';
import storeCreator from '../src/store/configureStore';
import './index.css';
import App from './App';

const store = storeCreator();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

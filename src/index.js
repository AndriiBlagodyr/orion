import React from 'react';
import ReactDOM from 'react-dom';
// import { createClient, Provider } from '@urql/core';
// import {createClient, Provider} from 'urql';
import {Provider} from 'react-redux';
import storeCreator from '../src/store/configureStore';
import './index.css';
import App from './App';

const store = storeCreator();

// const CLIENT_URL = 'https://serve.onegraph.com/graphql?app_id=e7384078-d09c-427d-8bd5-d7e59e95f362';
// const client = createClient({url: CLIENT_URL});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

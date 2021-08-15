import {configureStore} from '@reduxjs/toolkit';
// import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './reducer';
// import logger from './middleware/logger';
// import toast from './middleware/toast';
// import api from './middleware/api';

// eslint-disable-next-line func-names
export default function () {
  return configureStore({
    reducer,
    // middleware: [...getDefaultMiddleware(), logger({destination: 'console'}), toast, api],
    middleware: [],
  });
}

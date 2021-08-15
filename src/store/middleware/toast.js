// eslint-disable-next-line no-unused-vars
const toast = store => next => action => {
  if (action.type === 'error') console.log('Toastify', action.payload.message);
  else return next(action);
};

export default toast;

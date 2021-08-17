// eslint-disable-next-line no-unused-vars
const logger = param => store => next => action => {
  console.log('Logging', param);
  return next(action);
  // logger > toast > api
};

export default logger;

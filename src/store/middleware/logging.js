const loggingMiddleware = (store) => (next) => (action) => {
  console.info(
    '%cINFO:',
    `Dispatching a ${action.type} action with payload:`,
    action.payload,
  );
  const result = next(action);
  return result;
};

export default loggingMiddleware;

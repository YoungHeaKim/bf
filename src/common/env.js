const { REACT_APP_ENDPOINT, NODE_ENV } = process.env;
const endpoint = REACT_APP_ENDPOINT;
const __DEV__ = NODE_ENV === 'development';

export { endpoint, __DEV__ };
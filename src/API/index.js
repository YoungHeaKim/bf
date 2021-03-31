import Promise from 'bluebird';
import axios from 'axios';

const endpoint = '/api';

axios.interceptors.response.use(
  response => response.data,
  error => {
    const { data } = error.response;
    console.error(data);
    return Promise.reject(data);
  }
);

const request = (url, process) => {
  const tokens = url.split('/');
  return (...args) =>
    new Promise((resolve, reject) => {
      const mappedURL =
        endpoint +
        tokens
          .map((token, i) => (token.startsWith(':') ? args.shift() : token))
          .join('/');
      return resolve(process(mappedURL, args));
    });
};

const GET = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.get(mappedURL, { params, headers });
  });

const DELETE = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.delete(mappedURL, { params, headers });
  });

const POST = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.post(mappedURL, body, { params, headers });
  });

const PUT = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.put(mappedURL, body, { params, headers });
  });

const StoreApi = {
  add: POST('/stores'),
  getList: GET('/stores'),
  get: GET('/stores/:store_id'),
  update: PUT('/stores/:store_id'),
};

const AuthApi = {
  createAuth: POST('/auth/login'),
  destroyAuth: DELETE('/auth/logout'),
};

const OrderApi = {
  add: POST('/orders'),
  getList: date => axios.get(`${endpoint}/orders?${date}`),
  getStoreList: (date, store) =>
    axios.get(`${endpoint}/orders?${date}&store=${store}`),
  get: GET('/orders/:order_id'),
  update: PUT('/orders/:order_id'),
  delete: DELETE('/orders/:order_id'),
};

export { StoreApi, AuthApi, OrderApi };

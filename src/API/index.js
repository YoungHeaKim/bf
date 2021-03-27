import Promise from 'bluebird';
import axios from 'axios';

const endpoint = '/api';

axios.interceptors.response.use(
  response => response.data,
  error => {
    const { data, status } = error.response;
    if (status === 422) return Promise.reject(data);
    console.error(data);
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

const UserApi = {
  getArtistUserList: GET('/user/artist/list'),
  get: GET('/user/:user_id'),
  getArtist: GET('/user/artist/:artist_id'),
  getList: GET('/user/artist/filter'),
};

const StoreApi = {
  add: POST('/stores/'),
  get: GET('/stores/:store_id'),
  update: PUT('/stores/:artist_id'),
};

const AuthApi = {
  createAdminAuth: POST('/auth/signIn'),
  destroyAuth: DELETE('/auth/signOut'),
};

export { UserApi, StoreApi, AuthApi };

const proxy = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const { BACKEND_URL } = process.env;

module.exports = function (app) {
  app.use(
    proxy('/api', {
//       target: 'http://localhost:8080/',
      target: BACKEND_URL,
      changeOrigin: true,
    })
  );
};

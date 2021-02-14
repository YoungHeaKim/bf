import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'App.jsx';
import './normalize.scss';
// import {ErrorBoundary} from 'components';

const MOUNT_NODE = document.getElementById('root');

const render = Component => {
  console.log('com', Component, <Component />);

  return ReactDOM.render(
    // <Router>
    //   <ErrorBoundary>
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    //  </ErrorBoundary>
    // <Router>,
    MOUNT_NODE
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

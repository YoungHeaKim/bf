import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Header } from 'Main/components/index.js';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Date } from './components/index';

const cx = classNames.bind(styles);
const Main = () => {
  return (
    <div>
      <Header />
      <Date />
      <div>Main Home</div>
    </div>
  );
};

export default withRouter(Main);

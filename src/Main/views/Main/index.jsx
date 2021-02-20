import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home, Store } from '../index';

const cx = classNames.bind(styles);

const Main = () => {
  return (
    <div className={cx('main__wrap')}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Store} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);

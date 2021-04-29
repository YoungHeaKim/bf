import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Home, StoreList, Store, Login } from '../index';
import { Header, Nav } from 'Main/components';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

const Main = ({ location, history }) => {
  const pathName = location.pathname.split('/')[1];
  const [cookies] = useCookies(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!cookies.token) {
      history.push(`/login`);
      return setUser(null);
    }
  }, []);

  const loginFunc = data => {
    setUser('user있음');
    return history.push(`/`);
  };

  return (
    <div className={cx('main__wrap')}>
      {(user || cookies.token) && (
        <Fragment>
          <Header />
          <Nav pathName={pathName} />
        </Fragment>
      )}
      <Switch>
        <Route
          exact
          path="/login"
          component={() => <Login loginFunc={loginFunc} />}
        />
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={StoreList} />
        <Route exact path="/store/:_id" component={Store} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);

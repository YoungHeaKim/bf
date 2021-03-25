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
  const [cookies, setCookie] = useCookies(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCookieFunc();
  }, []);

  const getCookieFunc = () => {
    let result = cookies.user;
    setUser(result);
  };

  // TODO: login 완료시 운
  const loginFunc = data => {
    setUser(data);
    history.push(`/`);
  };

  return (
    <div className={cx('main__wrap')}>
      {user && (
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
        <Route exact path="/store/:id" component={Store} />
      </Switch>
    </div>
  );
};

export default withRouter(Main);

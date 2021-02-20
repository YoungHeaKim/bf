import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';

const cx = classNames.bind(styles);

const Store = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    setStores([
      {
        nickName: '동천',
        name: '동천',
        owner: '주인이름',
        bizNum: '123-45-6788',
      },
    ]);
  }, []);

  return (
    <Fragment>
      {stores.length !== 0 &&
        stores.map(store => (
          <List>
            <div className={cx('store__list')}>{store.nickName}</div>
            <div className={cx('store__list')}>{store.bizNum}</div>
            <div className={cx('store__list')}>{store.name}</div>
            <div className={cx('store__list')}>{store.owner}</div>
          </List>
        ))}
      <List />
    </Fragment>
  );
};

export default withRouter(Store);

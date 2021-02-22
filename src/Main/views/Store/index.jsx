import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List, SearchBar } from 'Main/components';

const cx = classNames.bind(styles);

const Store = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setStores([
      {
        nickName: '동천동천동천동천동천동천동천동천동천',
        name: '동천',
        owner: '주인이름',
        bizNum: '123-45-6788',
      },
    ]);
  }, []);

  const searchFunc = e => {
    setSearch(e.target.value);
    // TODO: Axios로 검색 결과 books 업데이트 시켜주기
  };

  return (
    <Fragment>
      <SearchBar searchFunc={searchFunc} />
      <List className={cx('store__title__wrap')}>
        <div className={cx('store__title')}>닉네임</div>
        <div className={cx('store__title')}>사업자 번호</div>
        <div className={cx('store__title')}>가게 이름</div>
        <div className={cx('store__title')}>대표자</div>
      </List>
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

import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';
import moment from 'moment';

const cx = classNames.bind(styles);

const Store = () => {
  const [store, setStore] = useState('');
  const [orders, setOrders] = useState([]);
  const year = moment().format('YYYY');
  const month = moment().format('MM');

  useEffect(() => {
    // 가게 정보 api로 가져오기(store)
    setStore({
      _id: '1',
      nickName: '동천',
      name: '동천',
      owner: '주인이름',
      bizNum: '123-45-6788',
      address: '서울시 서초구 방배로11길 35',
    });

    setOrders([
      {
        createdAt: '2021.01.01',
        items: [
          { id: '1', name: '고추', amount: 5, price: 20000 },
          { id: '2', name: '고추', amount: 5, price: 20000 },
          { id: '3', name: '고추', amount: 5, price: 20000 },
        ],
        totalPrice: 60000,
      },
      {
        createdAt: '2021.01.02',
        items: [
          { id: '4', name: '참기름', amount: 5, price: 20000 },
          { id: '5', name: '깨', amount: 5, price: 20000 },
        ],
        totalPrice: 40000,
      },
      {
        createdAt: '2021.01.03',
        items: [
          { id: '4', name: '참기름', amount: 5, price: 20000 },
          { id: '5', name: '깨', amount: 5, price: 20000 },
        ],
        totalPrice: 40000,
      },
    ]);
  }, []);

  return (
    <Fragment>
      <div className={cx('store__table')}>
        <div className={cx('store__tr', 'store__header')}>
          <div className={cx('store__td')}>닉네임</div>
          <div className={cx('store__td')}>상호</div>
          <div className={cx('store__td')}>사업자 번호</div>
          <div className={cx('store__td')}>대표자</div>
          <div className={cx('store__td')}>주소</div>
        </div>
        <List className={cx('store__tr')}>
          <div className={cx('store__td')}>{store.nickName}</div>
          <div className={cx('store__td')}>{store.name}</div>
          <div className={cx('store__td')}>{store.bizNum}</div>
          <div className={cx('store__td')}>{store.owner}</div>
          <div className={cx('store__td')}>{store.address}</div>
        </List>
      </div>
      <div className={cx('store__detail__title')}>
        <div className={cx('detail__title')}>
          {year}년 {/* TODO: 이부분 분기 나누는 부분 수정해야함 */}
        </div>
        <div className={cx('detail__title')}>{store.nickName} 분기별 장부</div>
      </div>
      {orders.length !== 0 &&
        orders.map((order, i) => (
          <List key={i}>
            <div className={cx('store__order')}>{order.createdAt}</div>
            <div className={cx('store__order__list')}>
              {order.items.length !== 0 &&
                order.items.map((item, index) => (
                  <div key={index} className={cx('store__order__item')}>
                    <div className={cx('order__item')}>{item.name}</div>
                    <div className={cx('order__item')}>{item.amount}</div>
                    <div className={cx('order__item')}>{item.price}</div>
                  </div>
                ))}
            </div>
            <div className={cx('store__order')}>{order.totalPrice}</div>
          </List>
        ))}
    </Fragment>
  );
};

export default withRouter(Store);

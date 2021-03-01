import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';
import { Quarter } from './components';
import moment from 'moment';

const cx = classNames.bind(styles);

const Store = () => {
  const [store, setStore] = useState('');
  const [orders, setOrders] = useState([]);
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');

  useEffect(() => {
    // 가게 정보 api로 가져오기(store)
    setStore({
      _id: '1',
      nickName: '동천',
      name: '동천',
      owner: '주인이름',
      bizNum: '123-45-6788',
      phoneNumber: '010-1234-5678',
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

    setYear(moment().format('YYYY'));

    const month = moment().format('MM');

    if (0 < Number(month) && Number(month) <= 3) setQuarter('1분기');
    else if (3 < Number(month) && Number(month) <= 6) setQuarter('2분기');
    else if (6 < Number(month) && Number(month) <= 9) setQuarter('3분기');
    else if (9 < Number(month)) setQuarter('4분기');
  }, []);

  const nextQuarter = () => {
    if (quarter === '1분기') setQuarter('2분기');
    if (quarter === '2분기') setQuarter('3분기');
    if (quarter === '3분기') setQuarter('4분기');
    if (quarter === '4분기') {
      setYear(Number(year) + 1);
      setQuarter('1분기');
    }
  };

  const prevQuarter = () => {
    if (quarter === '2분기') setQuarter('1분기');
    if (quarter === '3분기') setQuarter('2분기');
    if (quarter === '4분기') setQuarter('3분기');
    if (quarter === '1분기') {
      setYear(Number(year) - 1);
      setQuarter('4분기');
    }
  };

  return (
    <Fragment>
      <div className={cx('store__table')}>
        <div className={cx('store__tr', 'store__header')}>
          <div className={cx('store__td')}>닉네임</div>
          <div className={cx('store__td')}>상호</div>
          <div className={cx('store__td')}>전화 번호</div>
          <div className={cx('store__td')}>주소</div>
        </div>
        <List className={cx('store__tr')}>
          <div className={cx('store__td')}>{store.nickName}</div>
          <div className={cx('store__td')}>{store.name}</div>
          <div className={cx('store__td')}>{store.phoneNumber}</div>
          <div className={cx('store__td')}>{store.address}</div>
        </List>
      </div>
      <div className={cx('store__detail__title')}>
        <button
          className={cx('store__prev__btn')}
          onClick={prevQuarter}
          type="button"
        >
          &lt;
        </button>
        <div className={cx('detail__title')}>
          {year}년 {quarter}
        </div>
        <div className={cx('detail__title')}>{store.nickName} 분기별 장부</div>
        <button
          className={cx('store__next__btn')}
          onClick={nextQuarter}
          type="button"
        >
          &gt;
        </button>
      </div>
      {orders.length !== 0 &&
        orders.map((order, i) => <Quarter key={i} order={order} />)}
    </Fragment>
  );
};

export default withRouter(Store);

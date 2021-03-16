import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';
import { StoreItem,PutItem } from '../index';

const cx = classNames.bind(styles);

const Book = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectBook, setBook] = useState(undefined);

  useEffect(() => {
    // 이부분에서 date로 Axios 값 불러오기
    setOrders([
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '1',
        nickName: '이름1',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
          {
            price: 8000,
            name: '참기름',
            amount: 5,
          },
          {
            price: 8000,
            name: '깨',
            amount: 5,
          },
        ],
      },
      {
        id: '2',
        nickName: '이름2',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
        ],
      },
      {
        id: '3',
        nickName: '이름3',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [],
      },
      {
        id: '4',
        nickName: '이름4',
        date: 'Tue Mar 16 2021 20:53:21',
        items: [
          {
            price: 8000,
            name: '고추',
            amount: 5,
          },
        ],
      },
    ]);
  }, []);

  const openModal = (book) => {
    setBook(book);
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const addFunc = (order) => {
    console.log(order);
    
    setOpen(false);
  }

  return (
    <div className={cx('book__wrap')}>
      <div className={cx('book__title')}>장부</div>
      {orders.length !== 0 &&
        orders.map((order, i) => (
          <List key={i} onClick={()=>openModal(order)} closeFunc={closeModal}>
            <div className={cx('book__nickname')}>{order.nickName}</div>
            <div className={cx('book__list__wrap')}>
              <StoreItem className={cx('book__item')} items={order.items} />
            </div>
            <div className={cx('book__total')}>total price</div>
          </List>
        ))}
      <List onClick={() => openModal()}/>
      {open&& <PutItem open={open} addFunc={addFunc} closeFunc={closeModal} book={selectBook}/> }
    </div>
  );
};

export default withRouter(Book);

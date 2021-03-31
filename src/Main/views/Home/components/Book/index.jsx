import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List, OrderModalItem } from 'Main/components';
import { StoreItem } from '../index';

const cx = classNames.bind(styles);

const Book = ({ orders, addFunc, open, selectBook, openModal, closeModal }) => {
  return (
    <div className={cx('book__wrap')}>
      <div className={cx('book__title')}>장부</div>
      {orders.length !== 0 &&
        orders.map((order, i) => (
          <List key={i} onClick={() => openModal(order)} closeFunc={closeModal}>
            <div className={cx('book__nickname')}>{order.store.nickname}</div>
            <div className={cx('book__list__wrap')}>
              <StoreItem className={cx('book__item')} items={order.items} />
            </div>
            <div className={cx('book__total')}>{order.totalPrice}원</div>
          </List>
        ))}
      <List onClick={() => openModal()} />
      {open && (
        <OrderModalItem
          open={open}
          addFunc={addFunc}
          closeFunc={closeModal}
          book={selectBook}
        />
      )}
    </div>
  );
};

export default withRouter(Book);

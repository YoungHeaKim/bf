import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { StoreItem } from '../index';

const cx = classNames.bind(styles);

const Store = ({ book, key, className, onClick }) => {
  // TODO: totalPrice값 가져오기
  return (
    <button key={key} className={cx(className)} onClick={onClick}>
      <div className={cx('book__nickname')}>{book.nickName}</div>
      <div className={cx('book__list__wrap')}>
        <StoreItem className={cx('book__item')} items={book.items} />
      </div>
      <div className={cx('book__total')}>total price</div>
    </button>
  );
};

export default withRouter(Store);

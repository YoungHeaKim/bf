import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { krw } from 'korea-formatter';

const cx = classNames.bind(styles);

const StoreItem = ({ items }) => {
  return items.length === 0 ? (
    <div className={cx('book__item')}>데이터 없음</div>
  ) : (
    items.map((item, index) => (
      <div key={index} className={cx('book__item')}>
        <div className={cx('item__name')}>{item.name}</div>
        <div className={cx('item__quantity')}>{item.amount}</div>
        <div className={cx('item__price')}>{krw(item.price)}</div>
      </div>
    ))
  );
};

export default withRouter(StoreItem);

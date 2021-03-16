import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const StoreItem = ({ items, className }) => {
  return items.length === 0 ? (
    <div className={cx(className)}>데이터 없음</div>
  ) : (
    items.map((item, index) => (
      <div key={index} className={cx(className)}>
        <div className={cx('item__name')}>{item.name}</div>
        <div className={cx('item__quantity')}>{item.amount}</div>
        <div className={cx('item__price')}>{item.price}원</div>
      </div>
    ))
  );
};

export default withRouter(StoreItem);

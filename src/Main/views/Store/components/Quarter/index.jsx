import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';

const cx = classNames.bind(styles);

const Quarter = ({ order }) => {
  const [plusOn, setPlusOn] = useState(false);

  const toggleOn = () => {
    setPlusOn(true);
  };

  return (
    <List onClick={toggleOn}>
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
        {plusOn && (
          <form className={cx('store__order__item')}>
            <input
              className={cx('order__item')}
              type="text"
              placeholder={'물품명'}
            />
            <input
              className={cx('order__item')}
              type="text"
              placeholder={'수량'}
            />
            <input
              className={cx('order__item')}
              type="text"
              placeholder={'가격'}
            />
          </form>
        )}
        {/* TODO: 등록 삭제 부분 완성해야함 */}
      </div>
      <div className={cx('store__order')}>{order.totalPrice}</div>
    </List>
  );
};

export default withRouter(Quarter);

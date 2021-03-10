import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';
import { FormControler } from '..';
import PlusSvg from 'images/plus.svg';

const cx = classNames.bind(styles);

const Quarter = ({ order, updateOrders }) => {
  const [plusOn, setPlusOn] = useState(false);
  const [putOn, setPutOn] = useState('');

  const toggleOn = (e, id) => {
    e.preventDefault();

    if (id) {
      setPutOn(id);
    } else setPlusOn(true);
  };

  const reset = type => {
    if (type === 'plus') setPlusOn(false);
    else if (type === 'put') setPutOn('');
    else {
      setPlusOn(false);
      setPutOn('');
    }
  };

  return (
    <List>
      <div className={cx('store__order')}>{order.createdAt}</div>
      <div className={cx('store__order__list')}>
        {order.items.length !== 0 &&
          order.items.map((item, index) =>
            putOn !== item.id ? (
              <button
                key={index}
                onClick={e => toggleOn(e, item.id)}
                className={cx('store__order__item')}
              >
                <div className={cx('order__item')}>{item.name}</div>
                <div className={cx('order__item')}>{item.amount}</div>
                <div className={cx('order__item')}>{item.price}</div>
              </button>
            ) : (
              <FormControler
                className={cx('store__order__item')}
                type="put"
                key={index}
                updateOrders={updateOrders}
                item={item}
                order={order}
                reset={reset}
                plusOn={plusOn}
              />
            )
          )}
        {plusOn && (
          <FormControler
            className={cx('store__order__item')}
            updateOrders={updateOrders}
            order={order}
            reset={reset}
            putOn={putOn}
          />
        )}
        {!plusOn && (
          <div className={cx('store__add__btn')}>
            <button onClick={toggleOn}>
              <img src={PlusSvg} alt="리스트 추가" />
            </button>
          </div>
        )}
      </div>
      <div className={cx('store__order', 'store__order__total')}>
        {order.totalPrice}
      </div>
    </List>
  );
};

export default withRouter(Quarter);

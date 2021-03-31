import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List, OrderModalItem } from 'Main/components';
import moment from 'moment';

const cx = classNames.bind(styles);

const Quarter = ({ order, updateOrders }) => {
  const [openModal, setOpenModal] = useState(false);

  const openFunc = () => {
    setOpenModal(true);
  };

  const closeFunc = () => {
    setOpenModal(false);
  };

  const addFunc = changeOrder => {
    updateOrders(changeOrder);
    setOpenModal(false);
  };

  return (
    <Fragment>
      <List onClick={openFunc}>
        <div className={cx('store__order')}>
          {moment(order.date).format('YYYY-MM-DD')}
        </div>
        <div className={cx('store__order__list')}>
          {order.items.length !== 0 &&
            order.items.map((item, index) => (
              <div key={index} className={cx('store__order__item')}>
                <div className={cx('order__item')}>{item.name}</div>
                <div className={cx('order__item')}>{item.amount}</div>
                <div className={cx('order__item')}>{item.price}원</div>
              </div>
            ))}
        </div>
        <div className={cx('store__order', 'store__order__total')}>
          {order.totalPrice}원
        </div>
      </List>
      {openModal && (
        <OrderModalItem
          book={order}
          open={openModal}
          addFunc={addFunc}
          closeFunc={closeFunc}
        />
      )}
    </Fragment>
  );
};

export default withRouter(Quarter);

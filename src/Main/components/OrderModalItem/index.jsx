import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Modal, NewItem, Calendar } from 'Main/components';
import SelectStore from './SelectStore';
import moment from 'moment';

const cx = classNames.bind(styles);

const OrderModalItem = ({ open, closeFunc, addFunc, propsOrder, date }) => {
  const [order, setOrder] = useState({
    id: undefined,
    date: moment(),
    store: {},
    items: [],
  });
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [calendarOn, setCalendarOn] = useState(false);

  useEffect(
    () =>
      propsOrder
        ? setOrder({
            ...propsOrder,
            items: [...propsOrder.items],
          })
        : setOrder({
            ...order,
            date: moment(date),
            items: [{ name: undefined, amount: undefined, price: undefined }],
          }),
    []
  );

  const changeText = (e, target, index) => {
    if (target === 'store') {
      return setOrder({
        ...order,
        [target]: e,
      });
    } else if (target === 'date') {
      setOrder({
        ...order,
        [target]: e,
      });
      return setCalendarOn(false);
    } else {
      return setOrder({
        ...order,
        items: order.items.map((item, i) =>
          i === index ? { ...item, [target]: e.target.value } : item
        ),
      });
    }
  };

  const changeOrder = () => {
    if (order.store === undefined || order.store === '') {
      setError('거래처 선택은 필수 값입니다.');
      return setFields(['store']);
    } else {
      order.items = order.items
        .filter(orderItem => orderItem.name !== undefined || '')
        .filter(orderItem => orderItem.amount !== undefined || '')
        .filter(orderItem => orderItem.price !== undefined || '');
      return addFunc(order);
    }
  };

  const calendarToggle = () => {
    setCalendarOn(true);
  };

  const addItem = () => {
    setOrder({
      ...order,
      items: [
        ...order.items,
        { name: undefined, amount: undefined, price: undefined },
      ],
    });
  };

  const removeItem = index => {
    setOrder({
      ...order,
      items: order.items.filter((item, i) => i !== index),
    });
  };

  const closeCalendar = () => {
    setCalendarOn(false);
  };

  const deleteOrder = () => {
    return addFunc(propsOrder, '삭제');
  };

  return (
    <Modal open={open} closeFunc={closeFunc} maxWidth="md">
      <Fragment>
        <DialogTitle className={cx('modal__title')}>
          <div>{propsOrder ? '장부 수정' : '장부 추가'}</div>
        </DialogTitle>
        <DialogContent>
          <div className={cx('modal__order')}>
            <SelectStore
              fields={fields}
              changeText={changeText}
              selectStore={order.store}
            />
            <div className={cx('modal__order__first')}>
              <div>날짜</div>
              {calendarOn ? (
                <Modal
                  className={cx('modal__calendar')}
                  open={calendarOn}
                  closeFunc={closeCalendar}
                >
                  <Calendar selectDate={changeText} date={order.date} />
                </Modal>
              ) : (
                <Button
                  onClick={calendarToggle}
                  className={cx('modal__order__date')}
                >
                  {moment(order.date).format('YYYY.MM.DD')}
                </Button>
              )}
            </div>
          </div>
          {order.items.length > 0 &&
            order.items.map((item, i) => (
              <NewItem
                item={item}
                key={i}
                index={i}
                changeText={changeText}
                removeItem={removeItem}
              />
            ))}
          <div className={cx('modal__order')}>
            <Button onClick={addItem}>물건 추가 등록</Button>
          </div>
        </DialogContent>
        {error && <div className={cx('modal__order__msg')}>{error}</div>}
        <DialogActions>
          <Button onClick={changeOrder} color="primary">
            등록
          </Button>
          {propsOrder && (
            <Button onClick={deleteOrder} color="primary">
              삭제
            </Button>
          )}
          <Button onClick={closeFunc} color="primary">
            취소
          </Button>
        </DialogActions>
      </Fragment>
    </Modal>
  );
};

export default withRouter(OrderModalItem);

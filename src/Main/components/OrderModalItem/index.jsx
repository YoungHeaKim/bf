import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Modal, NewItem, Calendar, AddStore } from 'Main/components';
import { StoreApi } from 'API';
import moment from 'moment';

const cx = classNames.bind(styles);

const OrderModalItem = ({ open, closeFunc, addFunc, book }) => {
  const [order, setOrder] = useState({
    id: undefined,
    date: moment(),
    store: undefined,
    items: [],
  });
  const [stores, setStores] = useState([]);
  const [AddOpen, setAddOpen] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [calendarOn, setCalendarOn] = useState(false);
  const [storeNickname, setStoreNickname] = useState('');

  // TODO: 이부분 체크
  useEffect(() => {
    return StoreApi.getList().then(({ stores }) => {
      if (book) {
        setOrder({
          ...book,
          items: [...book.items],
        });
        setStoreNickname(book.store.nickname);
      } else {
        setOrder({
          ...order,
          items: [{ name: undefined, amount: undefined, price: undefined }],
        });
        setStoreNickname(stores[0].nickname);
      }
      setStores(stores);
    });
  }, []);

  const changeText = (e, target, index) => {
    if (target === 'store') {
      setOrder({
        ...order,
        [target]: e.target.value,
      });
      setStoreNickname(e.target.value.nickname);
    } else if (target === 'date') {
      setOrder({
        ...order,
        [target]: e,
      });
      setCalendarOn(false);
    } else if (target === 'amount' || target === 'price') {
      let value = Number(e.target.value);
      setOrder({
        ...order,
        items: order.items.map((item, i) =>
          i === index ? { ...item, [target]: value } : item
        ),
      });
    } else {
      setOrder({
        ...order,
        items: order.items.map((item, i) =>
          i === index ? { ...item, [target]: e.target.value } : item
        ),
      });
    }
  };

  const changeOrder = () => {
    const filter = order.items
      .filter(orderItem => orderItem.name !== undefined || '')
      .filter(orderItem => orderItem.amount !== undefined || '')
      .filter(orderItem => orderItem.price !== undefined || '');

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

  const openAddStore = () => {
    setAddOpen(true);
  };

  const addStore = store => {
    if (store) {
      return StoreApi.getList().then(({ stores }) => {
        setStores(stores);
        setOrder({ ...order, store: store });
        setAddOpen(false);
      });
    }
  };

  const closeStore = () => {
    setAddOpen(false);
  };
  const closeCalendar = () => {
    setCalendarOn(false);
  };

  return (
    <Modal open={open} closeFunc={closeFunc} maxWidth="md">
      {AddOpen ? (
        <AddStore addFunc={addStore} closeFunc={closeStore} />
      ) : (
        <Fragment>
          <DialogTitle className={cx('modal__title')}>
            {book ? '장부 수정' : '장부 추가'}
          </DialogTitle>
          <DialogContent>
            <div className={cx('modal__textarea')}>
              {/* TODO: 이부분 수정해야함 */}
              <Select
                className={
                  fields.length > 0 && fields.includes('store')
                    ? cx('modal__order__error')
                    : cx('modal__order__name')
                }
                autoFocus
                margin="dense"
                label="거래처 이름"
                required
                select
                variant="outlined"
                value={storeNickname}
                onChange={e => changeText(e, 'store')}
              >
                {stores.length !== 0 &&
                  stores.map(store => (
                    <MenuItem key={store._id} value={store}>
                      {store.nickname}
                    </MenuItem>
                  ))}
                <Button onClick={openAddStore}>가게 새로 추가</Button>
              </Select>
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
            <div className={cx('modal__textarea')}>
              <Button onClick={addItem}>물건 추가 등록</Button>
            </div>
          </DialogContent>
          {error && <div className={cx('modal__order__msg')}>{error}</div>}
          <DialogActions>
            <Button onClick={changeOrder} color="primary">
              등록
            </Button>
            <Button onClick={closeFunc} color="primary">
              취소
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Modal>
  );
};

export default withRouter(OrderModalItem);

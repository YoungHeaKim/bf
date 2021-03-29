import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Book, Date } from './components/index';
import moment from 'moment';
import { OrderApi } from 'API';

const Main = () => {
  const today = moment().format('YYYY.MM.DD');
  const [date, setDate] = useState(today);
  const [orders, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectBook, setBook] = useState(undefined);

  useEffect(
    () => OrderApi.getList({ date: date }).then(data => console.log(data)),
    []
  );

  const openModal = book => {
    setBook(book);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const prevDate = () => {
    // 이부분에서 axios 사용해서 데이터 가져오기
    setDate(moment(date).subtract(1, 'd').format('YYYY.MM.DD'));
    return OrderApi.getList({ date: date }).then(data => console.log(data));
  };

  const nextDate = () => {
    // 이부분에서 axios 사용해서 데이터 가져오기
    setDate(moment(date).add(1, 'd').format('YYYY.MM.DD'));
  };

  // TODO: 수정 삭제 부분 완료
  const addFunc = order => {
    if (order.items.length === 0) {
      // TODO: Order delete 요청
      setOrder(orders.filter(state => state.id !== order.id));
    } else if (order.id === '') {
      // TODO: Order add 요청
      order.id = String(orders.length + 1);
      order.date = moment();
      let orderCopy = [...orders];
      orderCopy.push(order);
      setOrder(orderCopy);
    } else {
      // TODO: Order patch 요청
      setOrder(orders.map(state => (state.id === order.id ? order : state)));
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <Date
        date={date}
        prevDate={() => prevDate()}
        nextDate={() => nextDate()}
      />
      <Book
        date={date}
        orders={orders}
        addFunc={addFunc}
        openModal={openModal}
        closeModal={closeModal}
        open={open}
        selectBook={selectBook}
      />
    </Fragment>
  );
};

export default withRouter(Main);

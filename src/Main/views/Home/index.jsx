import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Book, Date } from './components/index';
import moment from 'moment';
import { OrderApi } from 'API';

const Main = () => {
  const today = moment();
  const nextD = moment().add(1, 'd');
  const [date, setDate] = useState(today);
  const [next, setNextDate] = useState(nextD);
  const [orders, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectBook, setBook] = useState(undefined);
  const [calendarToggle, setCalendarToggle] = useState(false);

  useEffect(() => queryFunc(date, next), []);

  const queryFunc = (preDate, nextDate) => {
    const query = `date>=${moment(preDate).format('YYYY-MM-DD')}&date<${moment(
      nextDate
    ).format('YYYY-MM-DD')}`;
    return OrderApi.getList(query).then(({ orders }) => setOrder(orders));
  };

  const openModal = book => {
    setBook(book);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const prevDate = () => {
    const now = moment(date).subtract(1, 'd');
    const after = date;
    setDate(now);
    setNextDate(after);

    return queryFunc(now, after);
  };

  const nextDate = () => {
    const now = next;
    const after = moment(next).add(1, 'd');
    setDate(now);
    setNextDate(after);

    return queryFunc(now, after);
  };

  const selectDate = select => {
    const now = select;
    const after = moment(select).add(1, 'd');
    setDate(now);
    setNextDate(after);

    return queryFunc(now, after).then(() => setCalendarToggle(false));
  };

  const addFunc = (order, type) => {
    order.date = moment(order.date).format('YYYY-MM-DD');

    if (type === '삭제' || order.items.length === 0) {
      if (order._id) {
        return OrderApi.delete(order._id)
          .then(() => queryFunc(date, next))
          .then(() => setOpen(false));
      } else {
        setOpen(false);
      }
    } else if (order._id) {
      order.items.map(item => delete item._id);
      return OrderApi.update(order._id, order)
        .then(({ order }) => {
          if (order) queryFunc(date, next);
        })
        .then(() => setOpen(false));
    } else {
      return OrderApi.add(order)
        .then(() => queryFunc(date, next))
        .then(() => setOpen(false));
    }
  };

  const calendarOnDate = () => {
    setCalendarToggle(true);
  };
  const closeCalendar = () => {
    setCalendarToggle(false);
  };

  return (
    <Fragment>
      <Date
        date={moment(date).format('YYYY-MM-DD')}
        prevDate={() => prevDate()}
        nextDate={() => nextDate()}
        calendarToggle={calendarToggle}
        calendarOnDate={calendarOnDate}
        closeCalendar={closeCalendar}
        selectDate={selectDate}
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

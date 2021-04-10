import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Book, Date } from './components/index';
import moment from 'moment';
import { OrderApi } from 'API';

const Main = () => {
  const today = moment().format('YYYY-MM-DD');
  const nextD = moment().add(1, 'd').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [next, setNextDate] = useState(nextD);
  const [orders, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectBook, setBook] = useState(undefined);

  useEffect(() => {
    const query = `date>=${date}&date<=${next}`;
    return OrderApi.getList(query).then(({ orders }) => setOrder(orders));
  }, []);

  const openModal = book => {
    setBook(book);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const prevDate = () => {
    const now = moment(date).subtract(1, 'd').format('YYYY-MM-DD');
    const after = date;
    setDate(now);
    setNextDate(after);
    const query = `date>=${now}&date<=${after}`;
    return OrderApi.getList(query).then(({ orders }) => setOrder(orders));
  };

  const nextDate = () => {
    const now = next;
    const after = moment(next).add(1, 'd').format('YYYY-MM-DD');
    setDate(now);
    setNextDate(after);
    const query = `date>=${now}&date<=${after}`;
    return OrderApi.getList(query).then(({ orders }) => setOrder(orders));
  };

  const addFunc = order => {
    if (order.items.length === 0) {
      return OrderApi.delete(order._id)
        .then(() => {
          const query = `date>=${date}&date<=${next}`;
          return OrderApi.getList(query);
        })
        .then(({ orders }) => {
          setOrder(orders);
          setOpen(false);
        });
    } else if (order._id) {
      order.items.map(item => delete item._id);
      return OrderApi.update(order._id, order)
        .then(({ order }) => {
          if (order) {
            const query = `date>=${date}&date<=${next}`;
            return OrderApi.getList(query);
          }
        })
        .then(({ orders }) => {
          setOrder(orders);
          setOpen(false);
        });
    } else {
      return OrderApi.add(order)
        .then(() => {
          const query = `date>=${date}&date<=${next}`;
          return OrderApi.getList(query);
        })
        .then(({ orders }) => {
          setOrder(orders);
          setOpen(false);
        });
    }
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

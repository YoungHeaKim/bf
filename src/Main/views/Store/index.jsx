import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Quarter, StoreDetail, ControlDate } from './components';
import { AddStore } from 'Main/components';
import moment from 'moment';
import { OrderApi, StoreApi } from 'API';
import Modal from 'Main/components/Modal';

const cx = classNames.bind(styles);

const Store = ({ location }) => {
  const [storeItem, setStore] = useState('');
  const [orders, setOrders] = useState([]);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [date, setDate] = useState({
    start: moment(),
    end: moment().add(1, 'd'),
  });
  const [quarter, setQuarter] = useState('');
  const [detailOn, setDetailOn] = useState(false);
  const [typeToggle, setType] = useState(false);

  const pathname = location.pathname.split('/')[2];

  useEffect(() => {
    let quarterValue = '';

    const month = moment().format('MM');

    if (0 < Number(month) && Number(month) <= 3) {
      setQuarter('1분기');
      quarterValue = '1분기';
    } else if (3 < Number(month) && Number(month) <= 6) {
      setQuarter('2분기');
      quarterValue = '2분기';
    } else if (6 < Number(month) && Number(month) <= 9) {
      setQuarter('3분기');
      quarterValue = '3분기';
    } else if (9 < Number(month)) {
      setQuarter('4분기');
      quarterValue = '4분기';
    }

    return StoreApi.get(pathname)
      .then(({ store }) => setStore(store))
      .then(() => queryFunc(year, quarterValue));
  }, []);

  const queryFunc = (selectYear, quarterValue) => {
    let query = '';
    if (quarterValue === '1분기') {
      query = `date>=${selectYear}-01-01&&date<=${selectYear}-03-31`;
    } else if (quarterValue === '2분기') {
      query = `date>=${selectYear}-04-01&&date<=${selectYear}-06-31`;
    } else if (quarterValue === '3분기') {
      query = `date>=${selectYear}-07-01&&date<=${selectYear}-09-31`;
    } else if (quarterValue === '4분기') {
      query = `date>=${selectYear}-10-01&&date<=${selectYear}-12-31`;
    }

    return OrderApi.getStoreList(query, pathname).then(({ orders }) => {
      setYear(selectYear);
      setQuarter(quarterValue);
      return setOrders(orders);
    });
  };

  const closeFunc = () => {
    setDetailOn(false);
  };

  const updateOrders = list => {
    if (list.items.length === 0) {
      return OrderApi.delete(list._id).then(() => queryFunc(year, quarter));
    } else {
      return OrderApi.update(list._id, list).then(
        ({ order }) => order && queryFunc(year, quarter)
      );
    }
  };

  const addFunc = () => {
    return StoreApi.get(pathname).then(({ store }) => {
      setStore(store);
      setDetailOn(false);
    });
  };

  const toggleControl = type => {
    if (type === 'quarter') {
      // 분기별 장부 가져오는 부분
      setType(false);
    } else {
      // 지정 날짜 장부 가져오는 부분
      setType(true);
      const query = `date>=${date.start.format(
        'YYYY-MM-DD'
      )}&&date<=${date.end.format('YYYY-MM-DD')}`;

      return OrderApi.getStoreList(query, pathname).then(({ orders }) =>
        setOrders(orders)
      );
    }
  };

  const dateFunc = (selectDate, type) => {
    setDate({ ...date, [type]: selectDate });

    if (type === 'start') {
      const query = `date>=${selectDate.format(
        'YYYY-MM-DD'
      )}&&date<=${date.end.format('YYYY-MM-DD')}`;

      return OrderApi.getStoreList(query, pathname).then(({ orders }) =>
        setOrders(orders)
      );
    } else {
      const query = `date>=${date.start.format(
        'YYYY-MM-DD'
      )}&&date<=${selectDate.format('YYYY-MM-DD')}`;

      return OrderApi.getStoreList(query, pathname).then(({ orders }) =>
        setOrders(orders)
      );
    }
  };

  return (
    <Fragment>
      <StoreDetail
        store={storeItem}
        detailBtn={() => setDetailOn(true)}
        detailOn={detailOn}
      />
      <ul className={cx('store__detail__type')}>
        <li
          className={
            typeToggle
              ? cx('store__detail__type__li')
              : cx('store__detail__type__on')
          }
          onClick={() => toggleControl('quarter')}
        >
          분기별
        </li>
        <li
          className={
            typeToggle
              ? cx('store__detail__type__on')
              : cx('store__detail__type__li')
          }
          onClick={() => toggleControl()}
        >
          기간별
        </li>
      </ul>
      <ControlDate
        queryFunc={queryFunc}
        dateFunc={dateFunc}
        quarter={quarter}
        year={year}
        date={date}
        typeToggle={typeToggle}
      />
      <div className={cx('store__detail__list')}>
        {orders.length !== 0 ? (
          orders.map((order, i) => (
            <Quarter key={i} order={order} updateOrders={updateOrders} />
          ))
        ) : (
          <div className={cx('store__detail__none')}>
            이번 분기에 주문이 없었습니다.
          </div>
        )}
      </div>
      {detailOn && (
        <Modal open={detailOn} closeFunc={closeFunc} maxWidth="md">
          <AddStore
            storeItem={storeItem}
            closeFunc={closeFunc}
            addFunc={addFunc}
          />
        </Modal>
      )}
    </Fragment>
  );
};

export default withRouter(Store);

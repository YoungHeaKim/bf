import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Quarter, StoreDetail } from './components';
import { AddStore } from 'Main/components';
import moment from 'moment';
import { OrderApi, StoreApi } from 'API';
import Modal from 'Main/components/Modal';

const cx = classNames.bind(styles);

const Store = ({ location }) => {
  const [storeItem, setStore] = useState('');
  const [orders, setOrders] = useState([]);
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [detailOn, setDetailOn] = useState(false);
  const pathname = location.pathname.split('/')[2];

  useEffect(() => {
    let quarterValue = '';
    const todayYear = moment().format('YYYY');
    setYear(todayYear);

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
    // 가게 정보 api로 가져오기(store)

    return StoreApi.get(pathname)
      .then(({ store }) => setStore(store))
      .then(() => queryFunc(todayYear, quarterValue))
      .then(({ orders }) => setOrders(orders));
  }, []);

  const queryFunc = (selectYear, quarterValue) => {
    let query = '';
    if (quarterValue === '1분기') {
      query = `date>=${selectYear}-01-01&&date<=${selectYear}-03-31`;
      return OrderApi.getStoreList(query, pathname);
    } else if (quarterValue === '2분기') {
      query = `date>=${selectYear}-04-01&&date<=${selectYear}-06-31`;
      return OrderApi.getStoreList(query, pathname);
    } else if (quarterValue === '3분기') {
      query = `date>=${selectYear}-07-01&&date<=${selectYear}-09-31`;
      return OrderApi.getStoreList(query, pathname);
    } else if (quarterValue === '4분기') {
      query = `date>=${selectYear}-10-01&&date<=${selectYear}-12-31`;
      return OrderApi.getStoreList(query, pathname);
    }
  };

  const nextQuarter = () => {
    if (quarter === '1분기') {
      setQuarter('2분기');
      return queryFunc(year, '2분기').then(({ orders }) => setOrders(orders));
    }
    if (quarter === '2분기') {
      setQuarter('3분기');
      return queryFunc(year, '3분기').then(({ orders }) => setOrders(orders));
    }

    if (quarter === '3분기') {
      setQuarter('4분기');
      return queryFunc(year, '4분기').then(({ orders }) => setOrders(orders));
    }

    if (quarter === '4분기') {
      setYear(Number(year) + 1);
      setQuarter('1분기');
      return queryFunc(year + 1, '1분기').then(({ orders }) =>
        setOrders(orders)
      );
    }
  };

  const prevQuarter = () => {
    if (quarter === '2분기') {
      setQuarter('1분기');
      return queryFunc(year, '1분기').then(({ orders }) => setOrders(orders));
    }
    if (quarter === '3분기') {
      setQuarter('2분기');
      return queryFunc(year, '2분기').then(({ orders }) => setOrders(orders));
    }
    if (quarter === '4분기') {
      setQuarter('3분기');
      return queryFunc(year, '3분기').then(({ orders }) => setOrders(orders));
    }
    if (quarter === '1분기') {
      setYear(Number(year) - 1);
      setQuarter('4분기');
      return queryFunc(year - 1, '4분기').then(({ orders }) =>
        setOrders(orders)
      );
    }
  };

  const detailBtn = () => {
    setDetailOn(true);
  };

  const closeFunc = () => {
    setDetailOn(false);
  };

  const updateOrders = list => {
    if (list.items.length === 0) {
      // TODO: Order delete 요청
      setOrders(orders.filter(state => state.id !== list.id));
    } else {
      setOrders(orders.map(state => (state.id === list.id ? list : state)));
    }
  };

  const addFunc = store => {
    return StoreApi.get(pathname).then(({ store }) => setStore(store));
  };

  return (
    <Fragment>
      <StoreDetail
        store={storeItem}
        detailBtn={detailBtn}
        detailOn={detailOn}
      />
      <div className={cx('store__detail__title')}>
        <button
          className={cx('store__prev__btn')}
          onClick={prevQuarter}
          type="button"
        >
          &lt;
        </button>
        <div className={cx('detail__title')}>
          {year}년 {quarter}
        </div>
        <div className={cx('detail__title')}>
          {storeItem.nickname} 분기별 장부
        </div>
        <button
          className={cx('store__next__btn')}
          onClick={nextQuarter}
          type="button"
        >
          &gt;
        </button>
      </div>
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
        <Modal open={detailOn} closeFunc={closeFunc}>
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

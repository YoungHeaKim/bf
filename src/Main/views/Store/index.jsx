import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';
import moment from 'moment';

const cx = classNames.bind(styles);

const Store = () => {
  const [store, setStore] = useState('');
  const [acoounts, setAcoounts] = useState([]);
  const year = moment().format('YYYY');
  const month = moment().format('MM');

  useEffect(() => {
    // 가게 정보 api로 가져오기(store)
    setStore({
      _id: '1',
      nickName: '동천',
      name: '동천',
      owner: '주인이름',
      bizNum: '123-45-6788',
      address: '서울시 서초구 방배로11길 35',
    });

    setAcoounts([{}]);
  }, []);

  return (
    <Fragment>
      <table className={cx('store__table')}>
        <thead>
          <tr className={cx('store__tr')}>
            <th>닉네임</th>
            <th>상호</th>
            <th>사업자 번호</th>
            <th>대표자</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{store.nickName}</th>
            <th>{store.name}</th>
            <th>{store.bizNum}</th>
            <th>{store.owner}</th>
            <th>{store.address}</th>
          </tr>
        </tbody>
      </table>
      <div className={cx('store__detail__title')}>
        <div className={cx('detail__title')}>
          {year}년 {/* TODO: 이부분 분기 나누는 부분 수정해야함 */}
        </div>
        <div className={cx('detail__title')}>{store.nickName} 분기별 장부</div>
      </div>
      {/* TODO: 날짜/ item.name / item.amount / item.price / item.totalPrice 순으로 list 뿌려줘야함 */}
      {acoounts.length !== 0 &&
        acoounts.map((account, i) => <List key={i}></List>)}
    </Fragment>
  );
};

export default withRouter(Store);

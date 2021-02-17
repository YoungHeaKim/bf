import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Date } from 'Main/components/index';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Book } from '../index';
import moment from 'moment';

const cx = classNames.bind(styles);

const Main = () => {
  const today = moment().format('YYYY.MM.DD');
  const [date, setDate] = useState(today);

  const prevDate = () => {
    // 이부분에서 axios 사용해서 데이터 가져오기
    setDate(moment(date).subtract(1, 'd').format('YYYY.MM.DD'));
  };

  const nextDate = () => {
    // 이부분에서 axios 사용해서 데이터 가져오기
    setDate(moment(date).add(1, 'd').format('YYYY.MM.DD'));
  };

  return (
    <div className={cx('main__wrap')}>
      <Date
        date={date}
        prevDate={() => prevDate()}
        nextDate={() => nextDate()}
      />
      <Book date={date} />
    </div>
  );
};

export default withRouter(Main);

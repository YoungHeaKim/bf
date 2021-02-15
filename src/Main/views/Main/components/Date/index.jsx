import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Date = () => {
  const today = moment().format('YYYY.MM.DD');
  const [date, setDate] = useState(today);

  const prevDate = () =>
    setDate(moment(date).subtract(1, 'd').format('YYYY.MM.DD'));

  const nextDate = () => setDate(moment(date).add(1, 'd').format('YYYY.MM.DD'));

  return (
    <div className={cx('date__wrap')}>
      <button className={cx('date__btn')} onClick={prevDate}>
        &lt;
      </button>
      <div className={cx('date')}>{date}</div>
      <button className={cx('date__btn')} onClick={nextDate}>
        &gt;
      </button>
    </div>
  );
};

export default withRouter(Date);

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Date = ({ date, prevDate, nextDate }) => {
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

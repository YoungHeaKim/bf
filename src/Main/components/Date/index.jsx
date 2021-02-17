import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Date = ({ date, prevDate, nextDate }) => {
  const year = date.split('.')[0];
  const month = date.split('.')[1];
  const day = date.split('.')[2];

  return (
    <div className={cx('date__wrap')}>
      <button className={cx('date__btn')} onClick={prevDate}>
        &lt;
      </button>
      <div className={cx('date__container')}>
        <span>{year}</span>
        <br />
        <span>
          {month}.{day}
        </span>
      </div>
      <button className={cx('date__btn')} onClick={nextDate}>
        &gt;
      </button>
    </div>
  );
};

export default withRouter(Date);

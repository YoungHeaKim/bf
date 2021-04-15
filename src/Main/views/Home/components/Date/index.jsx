import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal, Calendar } from 'Main/components';

const cx = classNames.bind(styles);

const Date = ({
  date,
  prevDate,
  nextDate,
  selectDate,
  calendarToggle,
  calendarOnDate,
  closeCalendar,
}) => {
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  return (
    <Fragment>
      <div className={cx('date__wrap')}>
        <button className={cx('date__btn')} onClick={prevDate} type="button">
          &lt;
        </button>
        <div className={cx('date__container')}>
          <button
            className={cx('date__container__btn')}
            onClick={calendarOnDate}
          >
            <span>{year}</span>
            <br />
            <span>
              {month}.{day}
            </span>
          </button>
        </div>
        <button className={cx('date__btn')} onClick={nextDate} type="button">
          &gt;
        </button>
      </div>
      {calendarToggle && (
        <Modal open={calendarToggle} closeFunc={closeCalendar}>
          <Calendar selectDate={selectDate} date={date} />
        </Modal>
      )}
    </Fragment>
  );
};

export default withRouter(Date);

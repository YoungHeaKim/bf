import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import moment from 'moment';
import { Modal, Calendar } from 'Main/components';

const cx = classNames.bind(styles);

const ControlDate = ({
  queryFunc,
  quarter,
  year,
  typeToggle,
  date,
  dateFunc,
}) => {
  const [calendarOn, setCalendarOn] = useState(false);
  const [chooseDate, setSelectDate] = useState(null);
  const [type, setType] = useState(null);

  const nextQuarter = () => {
    let quarterCopy = quarter;
    let yearCopy = year;

    if (quarter === '1분기') {
      quarterCopy = '2분기';
    }

    if (quarter === '2분기') {
      quarterCopy = '3분기';
    }

    if (quarter === '3분기') {
      quarterCopy = '4분기';
    }

    if (quarter === '4분기') {
      quarterCopy = '1분기';
      yearCopy = Number(year) + 1;
    }

    return queryFunc(yearCopy, quarterCopy);
  };

  const prevQuarter = () => {
    let quarterCopy = quarter;
    let yearCopy = year;

    if (quarter === '2분기') {
      quarterCopy = '1분기';
    }

    if (quarter === '3분기') {
      quarterCopy = '2분기';
    }

    if (quarter === '4분기') {
      quarterCopy = '3분기';
    }

    if (quarter === '1분기') {
      quarterCopy = '4분기';
      yearCopy = Number(year) - 1;
    }

    return queryFunc(yearCopy, quarterCopy);
  };

  const onCalendar = (date, type) => {
    setSelectDate(date);
    setType(type);
    setCalendarOn(true);
  };

  const selectDate = date => {
    dateFunc(date, type);
    setCalendarOn(false);
  };

  return (
    <div className={cx('store__detail__title')}>
      {typeToggle ? (
        <Fragment>
          <div className={cx('store__detail__title__term')}>
            <button
              className={cx('store__detail__title__term__btn')}
              onClick={() => dateFunc(moment().subtract(7, 'd'), 'start')}
            >
              일주일
            </button>
            <button
              className={cx('store__detail__title__term__btn')}
              onClick={() => dateFunc(moment().subtract(1, 'M'), 'start')}
            >
              한달
            </button>
            <button
              className={cx('store__detail__title__term__btn')}
              onClick={() => dateFunc(moment().subtract(1, 'y'), 'start')}
            >
              일년
            </button>
          </div>
          <div className={cx('store__detail__title__term')}>
            <button
              className={cx('store__detail__title__term__start')}
              onClick={() => onCalendar(date.start, 'start')}
            >
              {date.start.format('YYYY년 MM월 DD일')}
            </button>
            ~
            <button
              className={cx('store__detail__title__term__end')}
              onClick={() => onCalendar(date.end, 'end')}
            >
              {date.end.format('YYYY년 MM월 DD일')}
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
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
          <div className={cx('detail__title')}>분기별 장부</div>
          <button
            className={cx('store__next__btn')}
            onClick={nextQuarter}
            type="button"
          >
            &gt;
          </button>
        </Fragment>
      )}
      {calendarOn && (
        <Modal open={calendarOn} closeFunc={() => setCalendarOn(false)}>
          <Calendar selectDate={selectDate} date={chooseDate} type={type} />
        </Modal>
      )}
    </div>
  );
};

export default withRouter(ControlDate);

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import moment from 'moment';
import UpButton from 'images/btn-dropUp.svg';
import DownButton from 'images/btn-dropDown.svg';
import { Button } from '@material-ui/core';
const cx = classNames.bind(styles);

const Calendar = () => {
  const [m, setMoment] = useState(moment);
  const [startWeek, setStartWeek] = useState(null);
  const [endWeek, setEndWeek] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    let i = 0;
    const date = m.clone().startOf('month');
    const month = m.month();

    setStartWeek(m.clone().startOf('month').week());
    setEndWeek(
      m.clone().endOf('month').week() === 1
        ? 53
        : m.clone().endOf('month').week()
    );
    while (i++ < date.weekday()) {
      const cloneDates = dates;
      cloneDates.push(null);
      setDates(cloneDates);
    }

    while (month === date.month()) {
      dates.push(date.clone());
      date.add(1, 'days');
      setDates(dates);
    }
    let cnt =
      Math.floor(dates.length / 7) + (Math.floor(dates.length % 7) > 0 ? 1 : 0);
    let tmp = [];
    for (let index = 0; index < cnt; index++) {
      tmp.push(dates.splice(0, 7));
    }

    setDates(tmp);
  }, []);

  const prevMonth = () => {
    const mClone = m.clone();
    mClone.subtract(1, 'month');
    setMoment({ m: mClone });
  };

  const nextMonth = () => {
    const mClone = m.clone();
    mClone.add(1, 'month');
    setMoment({ m: mClone });
  };

  const selectDate = ({ onSelectDate }) => {
    if (m.isBefore(moment())) return false;
    if (m.diff(moment().subtract(1, 'days')) < 0) {
      return false;
    }
    onSelectDate && onSelectDate(m);
    setMoment({ m });
  };

  return (
    <div className={cx('calendar')}>
      <div className={cx('calendar__head')}>
        <Button className={cx('calendar__btn__prev')} onClick={prevMonth}>
          <img src={UpButton} alt="다음 달로 변환 버튼" />
        </Button>
        <span className={cx('calendar__month')}>{m.format('YYYY-MM')}</span>
        <Button className={cx('calendar__btn__next')} onClick={nextMonth}>
          <img src={DownButton} alt="다음 달로 변환 버튼" />
        </Button>
      </div>

      <div className={cx('calendar__date')}>
        <div className={cx('calendar__date__row', 'calendar__date__days')}>
          <div className={cx('calendar__date__col')}>일요일</div>
          <div className={cx('calendar__date__col')}>월요일</div>
          <div className={cx('calendar__date__col')}>화요일</div>
          <div className={cx('calendar__date__col')}>수요일</div>
          <div className={cx('calendar__date__col')}>목요일</div>
          <div className={cx('calendar__date__col')}>금요일</div>
          <div className={cx('calendar__date__col')}>토요일</div>
        </div>
        {dates.length !== 0 &&
          dates.map(weekDate => {
            return (
              <div
                className={cx('calendar__date__row', 'calendar__date__dates')}
              >
                {weekDate.map((date, i) => {
                  // TODO: 이부분 완성해야함
                  if (!date) {
                    return (
                      <div
                        key={i}
                        className={cx(
                          'calendar__date__col',
                          'calendar__date__null'
                        )}
                      />
                    );
                  }
                  let selected, today;

                  // 오늘 날짜
                  const todayDate = moment(new Date()).format('YYYY/MM/DD');
                  today = date.isSame(moment(todayDate));

                  return (
                    <div
                      key={i}
                      className={cx(
                        'calendar__date__col',
                        today && 'calendar__date__today'
                      )}
                      onClick={() => selectDate(date)}
                    >
                      {date.date()}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default withRouter(Calendar);

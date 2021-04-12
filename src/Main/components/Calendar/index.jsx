import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

const cx = classNames.bind(styles);

const Calendar = ({ selectDate, date }) => {
  const [startDate, setStartDate] = useState(moment(date).toDate());

  const onChange = date => {
    setStartDate(moment(date).toDate());
    selectDate(moment(date), 'date');
  };
  return (
    <div className={cx('calendar__wrap')}>
      <DatePicker
        selected={startDate}
        onChange={date => onChange(moment(date))}
        startDate={startDate}
        locale="ko"
        inline
      />
    </div>
  );
};

export default withRouter(Calendar);

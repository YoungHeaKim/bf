import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Modal = ({ isClose, data }) => {
  return (
    <div className={cx('modal')}>
      <div className={cx('modal__wrap')}>
        <span className={cx('close')} onClick={isClose}>
          &times;
        </span>
        <div>
          <h3>{data ? '장부 수정' : '장부 등록'}</h3>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Modal);

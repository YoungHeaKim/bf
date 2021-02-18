import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Modal = ({ className, children, isOpen, isClose }) => {
  return (
    isOpen && (
      <div className={cx('modal')}>
        <div className={cx('modal__wrap')}>
          <span className={cx('close')} onClick={isClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    )
  );
};

export default withRouter(Modal);

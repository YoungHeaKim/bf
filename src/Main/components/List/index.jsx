import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import PlusSvg from 'images/plus.svg';

const cx = classNames.bind(styles);

const List = ({ children, className, to, onClick }) => {
  return to ? (
    <Link className={cx('list__wrap', className)} to={to}>
      {children}
    </Link>
  ) : onClick ? (
    <button
      className={cx('list__wrap', className)}
      type="button"
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <img className={cx('list__add')} src={PlusSvg} alt="리스트 추가" />
      )}
    </button>
  ) : (
    <div className={cx('list__wrap', className)}>{children}</div>
  );
};

export default withRouter(List);

import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('logo__Wrap')}>
      <h1 className={cx('logo')}>
        <a href={'/'}>가게 관리</a>
      </h1>
    </div>
  );
};

export default withRouter(Header);

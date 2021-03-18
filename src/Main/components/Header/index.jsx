import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx('logo__Wrap')}>
      <h1 className={cx('logo')}>방배 정읍 고추 방앗간</h1>
    </div>
  );
};

export default withRouter(Header);

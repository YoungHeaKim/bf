import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Nav = ({ pathName }) => {
  return (
    <ul className={cx('nav__wrap')}>
      <li className={cx('nav__list')}>
        <Link className={pathName === '' ? cx('on') : cx('nav__link')} to={'/'}>
          장부
        </Link>
      </li>
      <li className={cx('nav__list')}>
        <Link
          className={pathName === 'store' ? cx('on') : cx('nav__link')}
          to={'/store'}
        >
          거래처 리스트
        </Link>
      </li>
    </ul>
  );
};

export default withRouter(Nav);

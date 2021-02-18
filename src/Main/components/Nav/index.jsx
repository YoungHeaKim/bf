import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Nav = () => {
  const [active, setActive] = useState(true);

  return (
    <ul className={cx('nav__wrap')}>
      <li className={cx('nav__list')}>
        <Link
          className={active && cx('on')}
          onClick={() => setActive(true)}
          to={'/'}
        >
          장부
        </Link>
      </li>
      <li className={cx('nav__list')}>
        <Link
          className={!active && cx('on')}
          onClick={() => setActive(false)}
          to={'/store'}
        >
          거래처 리스트
        </Link>
      </li>
    </ul>
  );
};

export default withRouter(Nav);

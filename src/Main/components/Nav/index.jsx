import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Nav = () => {
  return (
    <div className={cx('')}>
      <ul>
        <li>
          <button>장부</button>
        </li>
        <li>
          <button>가게부</button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Nav);

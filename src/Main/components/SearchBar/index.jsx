import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const SearchBar = ({ searchFunc }) => {
  return (
    <input
      type="search"
      className={cx('search__box')}
      placeholder="검색어 입력"
      onChange={searchFunc}
    />
  );
};

export default withRouter(SearchBar);

import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const SearchBar = ({ searchFunc }) => {
  return (
    <div className={cx('search__wrap')}>
      <select
        type="search"
        className={cx('search__box')}
        placeholder="검색어 입력"
        onChange={e => searchFunc(e, 'key')}
      >
        <option value="name">상호명</option>
        <option value="nickname">닉네임</option>
      </select>
      <input
        type="search"
        className={cx('search__box')}
        placeholder="검색어 입력"
        onChange={searchFunc}
      />
    </div>
  );
};

export default withRouter(SearchBar);

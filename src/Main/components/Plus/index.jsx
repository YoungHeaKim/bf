import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import PlusSvg from 'images/plus.svg';

const cx = classNames.bind(styles);

const Plus = ({ className, onClick }) => {
  return (
    <button className={cx(className)} type="button" onClick={onClick}>
      <img src={PlusSvg} alt="리스트 추가" />
    </button>
  );
};

export default withRouter(Plus);

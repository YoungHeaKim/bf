import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';

const cx = classNames.bind(styles);

const StoreDetail = ({ store, detailBtn }) => {
  return (
    store && (
      <div className={cx('store__table')}>
        <div className={cx('store__table__tr', 'store__header')}>
          <div className={cx('store__table__tr__td')}>닉네임</div>
          <div className={cx('store__table__tr__td')}>상호</div>
          <div className={cx('store__table__tr__td')}>전화 번호</div>
          <div className={cx('store__table__tr__td')}>주소</div>
        </div>
        <List className={cx('store__table__tr')} onClick={detailBtn}>
          <div className={cx('store__table__tr__td')}>{store.nickname}</div>
          <div className={cx('store__table__tr__td')}>{store.name}</div>
          <div className={cx('store__table__tr__td')}>
            {store.phoneNumber ? store.phoneNumber : ''}
          </div>
          <div className={cx('store__table__tr__td', 'store__td__address')}>
            {store.address && store.address.main ? (
              <Fragment>
                {store.address.main}
                <br />
                {store.address.detail}
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </List>
      </div>
    )
  );
};

export default withRouter(StoreDetail);

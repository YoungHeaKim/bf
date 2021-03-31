import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List } from 'Main/components';

const cx = classNames.bind(styles);

const StoreDetail = ({ store, detailOn, detailBtn }) => {
  return (
    store && (
      <div className={cx('store__table')}>
        <div className={cx('store__tr', 'store__header')}>
          <div className={cx('store__td')}>닉네임</div>
          <div className={cx('store__td')}>상호</div>
          <div className={cx('store__td')}>전화 번호</div>
          <div className={cx('store__td')}>주소</div>
        </div>
        <List className={cx('store__tr')} onClick={detailBtn}>
          <div className={cx('store__td')}>{store.nickname}</div>
          <div className={cx('store__td')}>{store.name}</div>
          <div className={cx('store__td')}>
            {store.phoneNumber ? store.phoneNumber : ''}
          </div>
          <div className={cx('store__td')}>
            {store.address.main ? (
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
        {detailOn && (
          <Fragment>
            <div className={cx('store__tr', 'store__header')}>
              <div className={cx('store__td__more')}>사업자 번호</div>
              <div className={cx('store__td__more')}>업태</div>
              <div className={cx('store__td__more')}>종목</div>
            </div>
            <div className={cx('store__tr')}>
              <div className={cx('store__td__more')}>
                {store.bizNum ? store.bizNum : ''}
              </div>
              <div className={cx('store__td__more')}>
                {store.category ? store.category : ''}
              </div>
              <div className={cx('store__td__more')}>
                {store.tag ? store.tag : ''}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  );
};

export default withRouter(StoreDetail);

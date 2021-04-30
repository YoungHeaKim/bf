import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List, SearchBar, AddStore, Modal } from 'Main/components';
import { StoreApi } from 'API';

const cx = classNames.bind(styles);

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ key: 'name', value: null });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return StoreApi.getList().then(({ stores }) => setStores(stores));
  }, []);

  const searchFunc = (e, type) => {
    if (type) {
      setSearch({ ...search, key: e.target.value });
    } else {
      setSearch({ ...search, value: e.target.value });
      if (search.key === 'name') {
        return StoreApi.getList({
          name: `/${e.target.value}/i`,
        }).then(({ stores }) => setStores(stores));
      } else {
        return StoreApi.getList({
          nickname: `/${e.target.value}/i`,
        }).then(({ stores }) => setStores(stores));
      }
    }
  };

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  const addModal = () =>
    StoreApi.getList().then(({ stores }) => {
      setStores(stores);
      setOpen(false);
    });

  return (
    <div className={cx('store__list__wrap')}>
      <div className={cx('search__wrap')}>
        <SearchBar searchFunc={searchFunc} search={search} />
      </div>
      <div className={cx('store__title__wrap')}>
        <div className={cx('store__title')}>닉네임</div>
        <div className={cx('store__title')}>상호</div>
        <div className={cx('store__title')}>전화 번호</div>
        <div className={cx('store__title')}>주소</div>
      </div>
      {stores.length !== 0 &&
        stores.map((store, i) => (
          <List to={`/store/${store._id}`} key={i}>
            <div className={cx('store__list')}>{store.nickname}</div>
            <div className={cx('store__list')}>{store.name}</div>
            <div className={cx('store__list')}>{store.phoneNumber}</div>
            <div className={cx('store__list', 'store__list__address')}>
              {store.address && (
                <Fragment>
                  {store.address.main}, {store.address.detail}
                </Fragment>
              )}
            </div>
          </List>
        ))}
      <List onClick={() => openModal()} />
      {open && (
        <Modal open={open} closeFunc={closeModal} maxWidth="md">
          <AddStore addFunc={addModal} closeFunc={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default withRouter(StoreList);

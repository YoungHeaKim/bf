import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { List, SearchBar, AddStore, Modal } from 'Main/components';
import { StoreApi } from 'API';

const cx = classNames.bind(styles);

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return StoreApi.getList().then(({ stores }) => setStores(stores));
  }, []);

  const searchFunc = e => {
    e.preventDefault();
    setSearch(e.target.value);
    // TODO: Axios로 검색 결과 books 업데이트 시켜주기
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addModal = stores => {
    setOpen(false);
    setStores(stores);
  };

  return (
    <div className={cx('store__list__wrap')}>
      <div className={cx('search__wrap')}>
        <SearchBar searchFunc={searchFunc} search={search} />
      </div>
      <div className={cx('store__title__wrap')}>
        <div className={cx('store__title')}>닉네임</div>
        <div className={cx('store__title')}>상호</div>
        <div className={cx('store__title')}>사업자 번호</div>
        <div className={cx('store__title')}>대표자</div>
      </div>
      {stores.length !== 0 &&
        stores.map((store, i) => (
          <List to={`/store/${store._id}`} key={i}>
            <div className={cx('store__list')}>{store.nickname}</div>
            <div className={cx('store__list')}>{store.name}</div>
            <div className={cx('store__list')}>{store.bizNum}</div>
            <div className={cx('store__list')}>{store.owner}</div>
          </List>
        ))}
      <List onClick={() => openModal()} />
      {open && (
        <Modal open={open} closeFunc={closeModal}>
          <AddStore addFunc={addModal} closeFunc={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default withRouter(StoreList);

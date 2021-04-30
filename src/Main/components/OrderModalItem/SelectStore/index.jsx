import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button } from '@material-ui/core';
import { StoreApi } from 'API';
import { Modal, AddStore } from 'Main/components';

const cx = classNames.bind(styles);

const SelectStore = ({ fields, changeText, selectStore }) => {
  const [stores, setStores] = useState([]);
  const [AddOpen, setAddOpen] = useState(false);
  const [select, setSelect] = useState(false);

  useEffect(
    () => StoreApi.getList().then(({ stores }) => setStores(stores)),
    []
  );

  const openAddStore = () => {
    setAddOpen(true);
  };

  const addStore = store => {
    if (store) {
      return StoreApi.getList().then(({ stores }) => {
        setStores(stores);
        return setAddOpen(false);
      });
    }
  };

  const closeStore = () => {
    setAddOpen(false);
  };

  const selectOne = _id => {
    const selected = stores.find(store => store._id === _id);
    setSelect(false);
    return changeText(selected, 'store');
  };

  return AddOpen ? (
    <Modal open={AddOpen} closeFunc={closeStore} maxWidth="md">
      <AddStore addFunc={addStore} closeFunc={closeStore} />
    </Modal>
  ) : (
    <div className={cx('modal__order__first')}>
      <div>거래처 이름</div>
      <div
        className={
          select ? cx('modal__oreder__ul__on') : cx('modal__order__ul')
        }
      >
        <Button
          onClick={() => setSelect(!select)}
          className={
            fields.length > 0 && fields.includes('store')
              ? cx('modal__order__error')
              : cx('modal__order__ul__select')
          }
        >
          {selectStore.nickname}
        </Button>
        <ul className={cx('modal__order__list')}>
          {stores.length !== 0 &&
            stores.map(store => (
              <li
                className={cx('modal__order__list__item')}
                key={store._id}
                value={store}
              >
                <button onClick={() => selectOne(store._id)}>
                  {store.nickname}
                </button>
              </li>
            ))}
          <li className={cx('modal__order__list__item')}>
            <button onClick={openAddStore}>거래처 추가</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(SelectStore);

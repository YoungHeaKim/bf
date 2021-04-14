import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Button, MenuItem, Select } from '@material-ui/core';
import { StoreApi } from 'API';
import { Modal, AddStore } from 'Main/components';

const cx = classNames.bind(styles);

const SelectStore = ({ fields, changeText, selectStore }) => {
  const [stores, setStores] = useState([]);
  const [AddOpen, setAddOpen] = useState(false);

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

  return AddOpen ? (
    <Modal open={AddOpen} closeFunc={closeStore} maxWidth="md">
      <AddStore addFunc={addStore} closeFunc={closeStore} />
    </Modal>
  ) : (
    <div className={cx('modal__order__first')}>
      <div>거래처 이름</div>
      <Select
        className={
          fields.length > 0 && fields.includes('store')
            ? cx('modal__order__error')
            : cx('modal__order__name')
        }
        autoFocus
        margin="dense"
        required
        select="true"
        variant="outlined"
        renderValue={store => store.nickname}
        value={selectStore.nickname && selectStore.nickname}
        onChange={e => changeText(e, 'store')}
      >
        {stores.length !== 0 &&
          stores.map(store => (
            <MenuItem key={store._id} value={store}>
              {store.nickname}
            </MenuItem>
          ))}
        <Button onClick={openAddStore}>가게 새로 추가</Button>
      </Select>
    </div>
  );
};

export default withRouter(SelectStore);

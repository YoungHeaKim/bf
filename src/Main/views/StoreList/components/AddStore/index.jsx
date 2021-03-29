import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Delete from 'images/delete.svg';
import { Modal } from 'Main/components';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';

const cx = classNames.bind(styles);

const NewItem = ({ open, closeFunc, addFunc }) => {
  const [store, setStore] = useState({});

  const changeText = () => {};
  const changeStore = () => {};

  return (
    <Modal open={open} closeFunc={closeFunc}>
      <DialogTitle className={cx('modal__title')}>새로운 가게 등록</DialogTitle>
      <DialogContent>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>

        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={changeStore} color="primary">
          등록
        </Button>
        <Button onClick={closeFunc} color="primary">
          취소
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default withRouter(NewItem);

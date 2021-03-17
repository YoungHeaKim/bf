import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal, Address } from 'Main/components';
import {DialogActions,DialogContent,DialogTitle,Button,TextField} from '@material-ui/core';

const cx = classNames.bind(styles);

const AddStore = ({ open, closeFunc, addFunc }) => {
  const [store, setStore] = useState({
    name: '',
    nickName: '',
    bizNum: '',
    owner: '',
    address: '',
    detailAddress: '',
    category: '',
    tag: '',
  });
  const [isPostOpen, setIsPostOpen] = useState(false);

  const changeText = (e, target) => {
    setStore({
      ...store,
      [target]: e.target.value,
    });
  };

  const postAddress = data => {
    setStore({
      ...store,
      address: data,
    });
    setIsPostOpen(false);
  };

  const openAddress = () => {
    setIsPostOpen(true);
    setStore({
      ...store,
      detailAddress: '',
    });
  };

  const addStore = () => {
    // TODO: item 등록 부분 완성해야함
    store._id = '2';
    addFunc(store)
  }

  return (
    <Modal open={open} closeFunc={closeFunc}>
      <DialogTitle className={cx('modal__title')}>
        거래처 새로 등록하기
      </DialogTitle>
      <DialogContent>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="거래처 상호"
            type="string"
            value={store.name}
            onChange={e => changeText(e, 'name')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="대표자"
            type="string"
            value={store.owner}
            onChange={e => changeText(e, 'owner')}
          />
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="사업자 번호"
            type="string"
            value={store.bizNum}
            onChange={e => changeText(e, 'bizNum')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="업태"
            type="string"
            value={store.category}
            onChange={e => changeText(e, 'category')}
          />
          <TextField
            className={cx('modal__textfield')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="종목"
            type="string"
            value={store.tag}
            onChange={e => changeText(e, 'tag')}
          />
        </div>
        <div className={cx('modal__textarea')}>
          {isPostOpen ? (
            <Address postAddress={postAddress} />
          ) : (
            <Button
              className={cx('modal__textfield', 'modal__address')}
              onClick={openAddress}
            >
              {store.address === '' ? '주소추가' : store.address}
            </Button>
          )}
        </div>
        {store.address !== '' && (
          <div className={cx('modal__textarea')}>
            <TextField
              className={cx('modal__textfield', 'modal__address__detail')}
              autoFocus
              margin="dense"
              variant="outlined"
              label="상세 주소"
              type="string"
              value={store.detailAddress}
              onChange={e => changeText(e, 'detailAddress')}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={addStore} color="primary">
          등록
        </Button>
        <Button onClick={closeFunc} color="primary">
          취소
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default withRouter(AddStore);

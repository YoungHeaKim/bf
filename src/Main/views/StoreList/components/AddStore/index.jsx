import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal } from 'Main/components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const cx = classNames.bind(styles);

const AddStore = ({ open, closeFunc, addFunc }) => {
  const [store, setStore] = useState({
    name: '',
    nickName: '',
    bizNum: '',
    owner: '',
    address: '',
    category: '',
    tag: '',
  });

  const changeText = (e, target) => {
    setStore({
      ...store,
      [target]: e.target.value,
    });
  };

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
          <TextField
            className={cx('modal__textfield', 'modal__address')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="주소"
            type="address"
            value={store.address}
            onChange={e => changeText(e, 'address')}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => addFunc(store)} color="primary">
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

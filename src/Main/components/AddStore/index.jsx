import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import AddressForm from './AddressForm/index';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import { StoreApi } from 'API';

const cx = classNames.bind(styles);

const AddStore = ({ storeItem, closeFunc, addFunc }) => {
  const [store, setStore] = useState({
    name: undefined,
    nickname: undefined,
    bizNum: undefined,
    owner: undefined,
    address: {
      main: undefined,
      detail: undefined,
    },
    phoneNumber: undefined,
    category: undefined,
    tag: undefined,
    description: undefined,
  });
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (storeItem) setStore(storeItem);
  }, []);

  useEffect(() => {
    const phoneNumber = store.phoneNumber;
    if (phoneNumber)
      setStore({
        ...store,
        phoneNumber: phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{2,3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
  }, [store.phoneNumber]);

  useEffect(() => {
    const bizNum = store.bizNum;
    if (bizNum && bizNum.length === 10) {
      setStore({
        ...store,
        bizNum: bizNum
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3'),
      });
    }
  }, [store.bizNum]);

  const changeText = (e, target) => {
    if (target === 'detail') {
      setStore({
        ...store,
        address: {
          ...store.address,
          detail: e.target.value,
        },
      });
    } else if (target === 'address') {
      setStore({
        ...store,
        address: { ...store.address, main: e },
      });
    } else {
      setStore({
        ...store,
        [target]: e.target.value,
      });
    }
  };

  const postStore = () => {
    if (!store.nickname) {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['nickname']);
    } else if (!store.name) {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['name']);
    } else if (!store.phoneNumber) {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['phoneNumber']);
    } else if (storeItem) {
      return StoreApi.update(storeItem.id, store).then(({ store }) => {
        if (store) addFunc();
      });
    } else {
      return StoreApi.add(store)
        .then(({ store }) => {
          if (store) addFunc();
        })
        .catch(e => {
          setError('전화번호나 사업자 번호의 형식이 잘못 되었습니다.');
          setFields(['phoneNumber', 'bizNum']);
        });
    }
  };

  return (
    <Fragment>
      <DialogTitle className={cx('modal__store__title')}>
        {storeItem ? '거래처 수정하기' : '거래처 등록하기'}
      </DialogTitle>
      <DialogContent className={cx('modal__store__wrap')}>
        <div className={cx('modal__store__textarea')}>
          <TextField
            className={
              fields.length > 0 && fields.includes('nickname')
                ? cx('modal__store__error')
                : cx('modal__store__three')
            }
            autoFocus
            required
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={store.nickname}
            onChange={e => changeText(e, 'nickname')}
          />
          <TextField
            className={
              fields.length > 0 && fields.includes('name')
                ? cx('modal__store__error')
                : cx('modal__store__three')
            }
            required
            margin="dense"
            variant="outlined"
            label="거래처 상호"
            type="string"
            value={store.name}
            onChange={e => changeText(e, 'name')}
          />
          <TextField
            className={cx('modal__store__three')}
            margin="dense"
            variant="outlined"
            label="대표자"
            type="string"
            value={store.owner}
            onChange={e => changeText(e, 'owner')}
          />
        </div>
        <div className={cx('modal__store__textarea')}>
          <TextField
            className={
              fields.length > 0 && fields.includes('phoneNumber')
                ? cx('modal__store__err')
                : cx('modal__store__two')
            }
            required
            margin="dense"
            variant="outlined"
            label="전화 번호"
            type="string"
            inputProps={{ maxLength: 13 }}
            value={store.phoneNumber}
            onChange={e => changeText(e, 'phoneNumber')}
          />
          <TextField
            className={cx('modal__store__two')}
            margin="dense"
            variant="outlined"
            label="사업자 번호"
            type="string"
            value={store.bizNum}
            inputProps={{ maxLength: 12 }}
            onChange={e => changeText(e, 'bizNum')}
          />
        </div>
        <div className={cx('modal__store__textarea')}>
          <TextField
            className={cx('modal__store__two')}
            margin="dense"
            variant="outlined"
            label="업태"
            type="string"
            value={store.category}
            onChange={e => changeText(e, 'category')}
          />
          <TextField
            className={cx('modal__store__two')}
            margin="dense"
            variant="outlined"
            label="종목"
            type="string"
            value={store.tag}
            onChange={e => changeText(e, 'tag')}
          />
        </div>
        <AddressForm address={store.address} changeText={changeText} />
        <div className={cx('modal__store__textarea')}>
          <TextField
            className={cx('modal__description')}
            margin="dense"
            multiline={true}
            variant="outlined"
            label="메모 사항"
            type="string"
            value={store.description}
            onChange={e => changeText(e, 'description')}
          />
        </div>
        {error && <div className={cx('modal__store__msg')}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={postStore} color="primary">
          등록
        </Button>
        <Button onClick={closeFunc} color="primary">
          취소
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default withRouter(AddStore);

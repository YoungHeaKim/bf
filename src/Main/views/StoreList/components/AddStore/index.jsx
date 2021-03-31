import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal, Address } from 'Main/components';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import { StoreApi } from 'API';

const cx = classNames.bind(styles);

const AddStore = ({ open, closeFunc, addFunc }) => {
  const [store, setStore] = useState({
    name: '',
    nickname: '',
    bizNum: '',
    owner: '',
    address: {
      main: '',
      detail: '',
    },
    phoneNumber: '',
    category: '',
    tag: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [isPostOpen, setIsPostOpen] = useState(false);

  useEffect(() => {
    const phoneNumber = store.phoneNumber;
    setStore({
      ...store,
      phoneNumber: phoneNumber
        .replace(/-/g, '')
        .replace(/(\d{2,3})(\d{4})(\d{4})/, '$1-$2-$3'),
    });
  }, [store.phoneNumber]);

  useEffect(() => {
    const bizNum = store.bizNum;
    if (bizNum.length === 10) {
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
    } else {
      setStore({
        ...store,
        [target]: e.target.value,
      });
    }
  };

  const postAddress = data => {
    setStore({
      ...store,
      address: { main: data },
    });
    setIsPostOpen(false);
  };

  const postStore = () => {
    if (store.name === '') {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['name']);
    }
    if (store.nickname === '') {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['nickname']);
    }
    if (store.phoneNumber === '') {
      setError('상호, 닉네임, 전화번호는 필수 입력값입니다.');
      return setFields(['phoneNumber']);
    } else {
      return StoreApi.add(store)
        .then(store => {
          if (store) addFunc(store);
        })
        .catch(e => {
          setError('전화번호나 사업자 번호의 형식이 잘못 되었습니다.');
          setFields(['phoneNumber', 'bizNum']);
        });
    }
  };

  return (
    <Modal open={open} closeFunc={closeFunc}>
      <DialogTitle className={cx('modal__store__title')}>
        거래처 새로 등록하기
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
                ? cx('modal__store__error')
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
        <div className={cx('modal__store__textarea')}>
          {isPostOpen ? (
            <Address postAddress={postAddress} />
          ) : (
            <Button
              className={cx('modal__store__textfield', 'modal__address')}
              onClick={() => setIsPostOpen(true)}
            >
              {store.address.main === '' ? '주소추가' : store.address.main}
            </Button>
          )}
        </div>
        {store.address.main !== '' && (
          <div className={cx('modal__store__textarea')}>
            <TextField
              className={cx('modal__address__detail')}
              margin="dense"
              variant="outlined"
              label="상세 주소"
              type="string"
              value={store.address.detail}
              onChange={e => changeText(e, 'detail')}
            />
          </div>
        )}
        <div className={cx('modal__store__textarea')}>
          <TextField
            className={cx('modal__address__detail')}
            margin="dense"
            multiline={true}
            variant="outlined"
            label="메모 사항"
            type="string"
            value={store.address.description}
            onChange={e => changeText(e, 'description')}
          />
        </div>
        {error && <div>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={postStore} color="primary">
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

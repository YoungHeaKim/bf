import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal } from 'Main/components';
import {DialogActions,DialogContent,DialogTitle,Button,TextField} from '@material-ui/core';
import NewItem from '../NewItem';

const cx = classNames.bind(styles);

const PutItem = ({ open, closeFunc, addFunc, book }) => {
  const [order, setOrder] = useState({
    id:'',
    date: '',
    nickName: '',
    items: [],
  });

  useEffect(() => {
    if(book) setOrder({...book})
  }, []);

  const changeText = (e, target, index) => {
    if(target==='nickName' || target === 'date'){   
      setOrder({
        ...order,
        [target]: e.target.value,
      });
    } else {
      setOrder({
        ...order,
        items: order.items.map(
            (item, i) => 
              i=== index ? {...item, [target]: e.target.value}: item
          )
      })
    }
  };

  const changeOrder = () => {
    if(order.items.find(item => item.name === '') || order.nickName ==='') {
      // TODO: 이 부분 필수 입력값 필요
      console.log('오류')
    }
    else addFunc(order)
  }

  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, {name:'', amount: 0, price: 0}]
    })
  }

  const removeItem = index => {
    setOrder({
        ...order,
        items: order.items.filter((item, i) => i !== index)
      })
  }

  return (
    <Modal open={open} closeFunc={closeFunc}>
      <DialogTitle className={cx('modal__title')}>
        {
          book ? '장부 수정' : '장부 추가'
        }
      </DialogTitle>
      <DialogContent>
        <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__name')}
            autoFocus
            margin="dense"
            label="거래처 이름"
            type="string"
            variant="outlined"
            value={order.nickName}
            onChange={e => changeText(e, 'nickName')}
          />
        </div>
        {
          order.items.length > 0 && order.items.map((item,i) =>
            <NewItem item={item} key={i} index={i} changeText={changeText} removeItem={removeItem}/>
        )}
      <div className={cx('modal__textarea')}>
        <Button onClick={addItem}>물건 추가 등록</Button>
      </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={changeOrder} color="primary">
          등록
        </Button>
        <Button onClick={closeFunc} color="primary">
          취소
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default withRouter(PutItem);

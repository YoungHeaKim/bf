import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Modal } from 'Main/components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NewItem from '../NewItem';

const cx = classNames.bind(styles);

const PutItem = ({ open, closeFunc, addFunc, book }) => {
  const [order, setOrder] = useState({
    nickName: '',
    items: [],
  });
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if(book) {
      setOrder({
        nickName: book.nickName,
        items: book.items,
      })
    }
  }, []);

  const changeText = (e, target) => {
    // TODO: items안에 있는 내용 수정하는 부분 오류
    console.log(target)
    if(target==='nickName' || target === 'date'){   
      setOrder({
        ...order,
        [target]: e.target.value,
      });
    } else {
      setOrder({
        ...order,
        items: [...order.items, target]
      })
    }
  };

  const changeOrder = (i ) => {
    // TODO: item 등록 부분 완성해야함
    addFunc(order)
  }

  const addItem = () => {
    setOrder({
      ...order,
      items: [...order.items, {name:'', amount: 0, price: 0}]
    })
    setAdd(true)
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
            <NewItem item={item} key={i} index={i} changeText={changeText}/>
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

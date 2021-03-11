import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const FormControler = ({
  updateOrders,
  className,
  order,
  type,
  item,
  reset,
  plusOn,
  putOn,
}) => {
  const [putInput, setPutInput] = useState({
    name: '',
    amount: '',
    price: '',
  });

  useEffect(() => {
    setPutInput({ name: '', amount: '', price: '' });
  }, []);

  // input 입력시 input에 데이터 바꿔주는 부분
  const changeInput = (e, type) => {
    e.preventDefault();
    setPutInput({
      ...putInput,
      [type]: e.target.value,
    });
  };

  // form 데이터 처리 해주는 부분
  const formBtn = (type, id) => {
    if (type === 'add') {
      if (
        putInput.name === '' ||
        putInput.amount === '' ||
        putInput.price === ''
      )
        // TODO: 여기서 입력 안되고 추가 눌렀을때 error 발생 추가 해주어야함
        console.log('error');
      else {
        order.items.push(putInput);
        updateOrders(order);
      }
    } else if (type === 'cancel') {
      setPutInput({ name: '', amount: '', price: '' });
      reset('plus');
    } else if (type === 'put') {
      if (
        putInput.name === '' ||
        putInput.amount === '' ||
        putInput.price === ''
      ) {
        reset();
      }
      //TODO: item 수정 API 불러오기
      else {
        order.items.map(item => {
          if (item.id === id) {
            item.name = putInput.name === '' ? item.name : putInput.name;
            item.amount =
              putInput.amount === '' ? item.amount : putInput.amount;
            item.price = putInput.price === '' ? item.price : putInput.price;
          }
        });
        updateOrders(order);
      }
    } else if (type === 'delete') {
      //TODO: item 삭제 API 불러오기
      const deleteList = order.items.filter(item => item.id !== id);
      order.items = deleteList;
      updateOrders(order);
    }
  };
  return type === 'put' ? (
    <form className={className} onSubmit={() => formBtn('put', item.id)}>
      <input
        className={cx('order__input')}
        type="text"
        value={putInput.name === '' ? item.name : putInput.name}
        onChange={e => changeInput(e, 'name')}
      />
      <input
        className={cx('order__input')}
        type="number"
        min="0"
        value={putInput.amount === '' ? item.amount : putInput.amount}
        onChange={e => changeInput(e, 'amount')}
      />
      <input
        className={cx('order__input')}
        type="number"
        min="0"
        value={putInput.price === '' ? item.price : putInput.price}
        onChange={e => changeInput(e, 'price')}
      />
      <div className={cx('order__btn')}>
        <input type="submit" value="적용" />
        <button type="button" onClick={() => formBtn('delete', item.id)}>
          삭제
        </button>
      </div>
    </form>
  ) : (
    <form className={className} onSubmit={() => formBtn('add')}>
      <input
        className={cx('order__input')}
        type="text"
        placeholder={'물품명'}
        onChange={e => changeInput(e, 'name')}
      />
      <input
        className={cx('order__input')}
        type="number"
        min="0"
        placeholder={'수량'}
        onChange={e => changeInput(e, 'amount')}
      />
      <input
        className={cx('order__input')}
        type="number"
        min="0"
        placeholder={'가격'}
        onChange={e => changeInput(e, 'price')}
      />
      <div className={cx('order__btn')}>
        <input type="submit" value="추가" />
        <button type="button" onClick={() => formBtn('cancel')}>
          취소
        </button>
      </div>
    </form>
  );
};

export default withRouter(FormControler);

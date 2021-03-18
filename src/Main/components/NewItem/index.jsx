import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Delete from 'images/delete.svg'

const cx = classNames.bind(styles);

const NewItem = ({item, changeText, index, removeItem}) => {
  return (
    <div className={cx('modal__textarea')}>
          <TextField
            className={cx('modal__order__item')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="물건 이름"
            type="string"
            value={item.name}
            onChange={e => changeText(e, `name`, index)}
            />
          <TextField
            className={cx('modal__order__item')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="수량"
            type="number"
            value={item.amount}
            onChange={e => changeText(e, `amount`, index)}
          />
          <TextField
            className={cx('modal__order__item')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="가격"
            type="number"
            value={item.price}
            onChange={e => changeText(e, `price`, index)}
          />
          <Button className={cx('modal__order__btn')} onClick={() => removeItem(index)}><img src={Delete} alt="삭제버튼"/></Button>
        </div>
  );
};

export default withRouter(NewItem);

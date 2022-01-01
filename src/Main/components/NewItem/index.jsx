import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Delete from 'images/delete.svg';

const cx = classNames.bind(styles);

const NewItem = ({ item, changeText, index, removeItem }) => {
  return (
    <div className={cx('modal__new__wrap')}>
      <TextField
        className={cx('modal__new__item')}
        margin="dense"
        variant="outlined"
        inputProps={{ style: { fontSize: '20px', height: '2rem' } }}
        InputLabelProps={{ style: { fontSize: '20px' } }}
        label="물건 이름"
        type="string"
        required
        value={item.name && item.name}
        onChange={e => changeText(e, `name`, index)}
      />
      <TextField
        className={cx('modal__new__item')}
        margin="dense"
        variant="outlined"
        inputProps={{
          style: { fontSize: '20px', height: '2rem' },
          type: 'number',
        }}
        InputLabelProps={{ style: { fontSize: '20px' } }}
        label="수량"
        required
        value={item.amount && item.amount}
        onChange={e => changeText(e, `amount`, index)}
      />
      <TextField
        className={cx('modal__new__item')}
        margin="dense"
        variant="outlined"
        required
        InputLabelProps={{ style: { fontSize: '20px' } }}
        inputProps={{
          style: { fontSize: '20px', height: '2rem' },
          type: 'number',
        }}
        label="가격"
        value={item.price && item.price}
        onChange={e => changeText(e, `price`, index)}
      />
      <Button
        className={cx('modal__delete__btn')}
        onClick={() => removeItem(index)}
      >
        <img src={Delete} alt="삭제버튼" />
      </Button>
    </div>
  );
};

export default withRouter(NewItem);

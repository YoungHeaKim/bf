import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import TextField from '@material-ui/core/TextField';

const cx = classNames.bind(styles);

const NewItem = ({item, changeText, index}) => {
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
            onChange={e => changeText(e, `items[${index}].name`)}
            />
          <TextField
            className={cx('modal__order__item')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="수량"
            type="number"
            value={item.amount}
            onChange={e => changeText(e, `items[${index}].amount`)}
          />
          <TextField
            className={cx('modal__order__item')}
            autoFocus
            margin="dense"
            variant="outlined"
            label="가격"
            type="number"
            value={item.price}
            onChange={e => changeText(e, `items[${index}].price`)}
          />
        </div>
  );
};

export default withRouter(NewItem);

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { SearchAddress } from 'Main/components';
import { Button, InputLabel, TextField } from '@material-ui/core';

const cx = classNames.bind(styles);

const AddressForm = ({ address, changeText }) => {
  const [isPostOpen, setIsPostOpen] = useState(false);

  const postAddress = data => {
    if (data) changeText(data, 'address');
    setIsPostOpen(false);
  };

  return (
    <div className={cx('modal__store__address')}>
      <div className={cx('modal__address__wrap')}>
        <InputLabel className={cx('modal__store__label')}>
          기본 주소 :
        </InputLabel>
        {isPostOpen ? (
          <SearchAddress postAddress={postAddress} open={isPostOpen} />
        ) : (
          <Button
            variant="outlined"
            className={cx('modal__store__textfield', 'modal__address')}
            onClick={() => setIsPostOpen(true)}
          >
            {address && address.main ? address.main : '주소추가'}
          </Button>
        )}
      </div>
      {address && address.main && (
        <div className={cx('modal__address__wrap')}>
          <InputLabel className={cx('modal__store__label')}>
            상세 주소 :
          </InputLabel>
          <TextField
            className={cx('modal__address__detail')}
            margin="dense"
            variant="outlined"
            type="string"
            placeholder="상세주소"
            value={address.detail}
            onChange={e => changeText(e, 'detail')}
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(AddressForm);

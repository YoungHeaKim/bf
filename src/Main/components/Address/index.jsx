import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import DaumPostcode from 'react-daum-postcode';

const cx = classNames.bind(styles);

const Address = ({ postAddress }) => {
  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    let zonecode = data.zonecode;
    let address = '(' + zonecode + ')' + fullAddress;
    postAddress(address);
  };

  return (
    <DaumPostcode className={cx('address__wrap')} onComplete={handleComplete} />
  );
};

export default withRouter(Address);

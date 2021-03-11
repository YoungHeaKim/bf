import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import Dialog from '@material-ui/core/Dialog';

const cx = classNames.bind(styles);

const Modal = ({ open, closeFunc, children }) => {
  return (
    <Dialog open={open} onClose={closeFunc} fullWidth={true} maxWidth="md">
      {children}
    </Dialog>
  );
};

export default withRouter(Modal);

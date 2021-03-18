import React from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';

const Modal = ({ open, closeFunc, children }) => {
  return (
    <Dialog open={open} onClose={closeFunc} fullWidth={true} maxWidth="md">
      {children}
    </Dialog>
  );
};

export default withRouter(Modal);

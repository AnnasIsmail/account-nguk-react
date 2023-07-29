import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useState } from 'react';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDelete({open, handleClose, message, nama, actionDelete}) {

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message} <span style={{ color: '#2065D1' }}>{nama}</span> ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton color='error' loading={loading} onClick={()=> {actionDelete(); setLoading(true);}}>Delete</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
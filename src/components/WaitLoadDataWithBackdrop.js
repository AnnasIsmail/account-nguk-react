import { Backdrop, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

WaitLoadDataWithBackdrop.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default function WaitLoadDataWithBackdrop({ loading }) {
  const [overLongAPI, setOverLongAPI] = useState(false);
  const [textOverLongAPI, setTextOverLongAP] = useState('API-nya masih ngantuk nih bang, sabar ya.');

  setTimeout(() => {
    setOverLongAPI(true);
  }, 5000);

  setTimeout(() => {
    setTextOverLongAP('Buset dah tidur lagi ini API-nya bang, maap.');
  }, 10000);
  return (
    loading && (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        open
      >
        <CircularProgress color="inherit" />
        {overLongAPI && <Typography variant="h6">{textOverLongAPI}</Typography>}
      </Backdrop>
    )
  );
}

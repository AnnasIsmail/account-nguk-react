import { CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

WaitLoadData.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default function WaitLoadData({ loading }) {
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
      <div
        style={{
          width: '100%',
          marginTop: '30vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="inherit" />
        {overLongAPI && <Typography variant="h6">{textOverLongAPI}</Typography>}
      </div>
    )
  );
}

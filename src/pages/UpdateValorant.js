// material
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import WaitLoadData from '../components/WaitLoadData';
import UpdateList from '../sections/@dashboard/products/UpdateList';
// mock

// ----------------------------------------------------------------------

export default function UpdateValorant() {
  const [listUpdates, setListUpdates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get('https://api.henrikdev.xyz/valorant/v1/website/en-us').then((response) => {
      setListUpdates(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Page title="Update Valorant">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Update Valorant
          </Typography>
          <UpdateList listUpdates={listUpdates} />
        </Container>
      )}
    </Page>
  );
}

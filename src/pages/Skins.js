// material
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import WaitLoadData from '../components/WaitLoadData';
import SkinsList from '../sections/@dashboard/products/SkinsList';
// mock

// ----------------------------------------------------------------------

export default function Skins() {
  const [realListSkins, setRealListSkins] = React.useState([]);
  const [listSkins, setListSkins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) => {
      setListSkins(response.data.data);
      setRealListSkins(response.data.data);
      setLoading(false);
    });
  }, []);

  function searchCall() {
    const { value } = document.getElementById('searchCall');
    document.getElementById('searchCall').value = value;
    const listSkinSearch = realListSkins.filter((data) => data.displayName.toLowerCase().includes(value.toLowerCase()));
    setListSkins(listSkinSearch);
  }

  return (
    <Page title="All Skins">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            All Skins
          </Typography>
          <SkinsList listSkins={listSkins} />
        </Container>
      )}
      <input hidden type="button" onClick={searchCall} id="searchCall" />
    </Page>
  );
}

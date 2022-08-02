// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
// components
import axios from 'axios';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const name = 'Annas'

  const [data,setData] = React.useState();
  console.info('masuk');

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/account').then((response) =>{
      setData(response.data.data);
      console.log(data);
    });
    
  },[]);
  fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then((response) => console.log(response));
  
  return (
    <Page title="Dashboard">

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Hi {name}
            </Typography>
            <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Account
            </Button>
          </Stack>

        <Grid container spacing={3}>

      {
      data.map((dataDalam)=>{
        <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username={dataDalam.RiotId} password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>
      })
      }

          

        </Grid>
      </Container>
    </Page>
  );
}

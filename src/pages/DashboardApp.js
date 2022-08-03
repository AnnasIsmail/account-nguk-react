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

  const [data,setData] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/account').then((response) =>{
      setData(response.data.data);
    });
    
  },[]);

  return (
    <Page title="Dashboard">

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Hi {name}
            </Typography>
            <Button variant="contained" component={RouterLink} to="/account/create" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Account
            </Button>
          </Stack>

        <Grid container spacing={3}>

      {
      data.map((dataDalam,index)=>{

        const RiotIdAndTagline = `${dataDalam.riotId}#${dataDalam.tagLine}`

        return (<Grid item xs={12} sm={6} md={3} key={dataDalam.id}>
             <AppWidgetSummary username={dataDalam.riotId} password={dataDalam.password} RiotId={RiotIdAndTagline} owner={dataDalam.owner} icon={'simple-icons:valorant'} />
          </Grid>)
      })
      }

        </Grid>
      </Container>
    </Page>
  );
}

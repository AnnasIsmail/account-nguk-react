// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const name = 'Annas'

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
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>
         
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary username="annas2111" password="Annas211112345" RiotId="LUHUTFORPRESIDEN#PDIP" icon={'simple-icons:valorant'} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

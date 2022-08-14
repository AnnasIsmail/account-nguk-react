// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
// components
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref)=> {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashboardApp() {
  const name = 'Annas'

  const [data,setData] = React.useState([]);
  const [dataSkin,setDataSkin] = React.useState([]);
  const [dataAgent,setDataAgent] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/account').then((response) =>{
      setData(response.data.data);
    });
    
    axios.get('http://127.0.0.1:8000/api/skin').then((response) =>{
      setDataSkin(response.data.data);
    });

    axios.get('http://127.0.0.1:8000/api/agent').then((response) =>{
      setDataAgent(response.data.data);
    });

  },[]);

  function searchData(){
    console.log('cari')
  }

  const [message, setMessage] = React.useState('No Message');

  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',horizontal: 'right'
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const copy =(message)=>{
    const newState = {  vertical: 'bottom',horizontal: 'right',}
    setMessage(message);
    setState({ open: true, ...newState });
  }

  return (
    <Page title="Dashboard">
      <input hidden type="button" id='searchCall' onClick={searchData} />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
      ><Alert className='zindex' onClose={handleClose} severity="success" >
          Success Copy {message} to clipboard.
        </Alert>
      </Snackbar>
      
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
      data.map((dataDalam)=>{

        return (<Grid item xs={12} sm={6} md={3} key={dataDalam.id}>
             <AppWidgetSummary idAccount={dataDalam.id} dataSkin={dataSkin} dataAgent={dataAgent} copyProps={copy} username={dataDalam.username} password={dataDalam.password} puuid={dataDalam.puuid} owner={dataDalam.owner} icon={'simple-icons:valorant'}  />
          </Grid>)
      })
      }

        </Grid>
      </Container>
    </Page>
  );
}

// @mui
import { CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
// components
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';

import Iconify from '../components/Iconify';
import axiosConfig from '../utils/axiosConfig';

// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref)=> {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashboardApp() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const name = useSelector((state) => state.user.nama);

  const [data,setData] = React.useState([]);

  React.useEffect(() => {
    renderAccount();
  },[]);

  const renderAccount =()=> {
    axiosConfig.post('/accounts/', {token: cookies.token})
    .then((response) =>{
      setLoading(false);
      setData(response.data);
    });
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
    setTimeout(() => {
        setState({ open: false, ...newState });
    }, 2000);
  }


  const countPage = Math.ceil(data.length / 6);
  const [currentPage , setCurrentPage] = React.useState(1);
  const [indexFrom , setIndexFrom] = React.useState(-1);
  const [indexTo , setIndexTo] = React.useState(6);
  const  productsReady = [];


  const changePage =(e , value)=>{
    const page = value;
    const indexMax = page * 6;
    setCurrentPage(page);
    setIndexTo(indexMax);
    setIndexFrom(indexMax - 7);
  }

  const [loading , setLoading] = React.useState(true);
  const [kelamaan , setkelamaan] = React.useState(false);
  const [Textkelamaan , setTextkelamaan] = React.useState('API-nya masih ngantuk nih bang, sabar ya.');

  setTimeout(() => {
    setkelamaan(true);
  }, 5000);

  setTimeout(() => {
    setTextkelamaan('Buset dah tidur lagi ini API-nya bang, maap.');
  }, 10000);

  return (
    <Page title="All Account">
      {(loading)?
        <div style={{ width: '100%',marginTop: '30vh', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
          {(kelamaan)&&
            <Typography variant='h6'>
              {Textkelamaan}
            </Typography>
          }
        </div>
      :
      <>
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
          data.map((dataDalam , index)=>(
              (index > indexFrom && index < indexTo)&&
              <Grid item xs={12} sm={6} md={4} key={dataDalam.id}>
                <AppWidgetSummary key={dataDalam.id} idAccount={dataDalam._id} rerender={renderAccount} dataAccount={dataDalam} copyProps={copy} username={dataDalam.username} password={dataDalam.password} puuid={dataDalam.puuid} owner={dataDalam.owner} icon={'simple-icons:valorant'}  />
              </Grid>))
        }

          </Grid>
          <div className='flex-center' >
            <Pagination count={countPage} shape="rounded" onChange={changePage} sx={{ mx: 'auto' , my: 5}} />
          </div>
        </Container>
      </>
      }
    </Page>
  );
}

// @mui
import { Container, Grid, Stack, Typography } from '@mui/material';
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
import WaitLoadData from '../components/WaitLoadData';
// sections
import Iconify from '../components/Iconify';
import CardAccount from '../sections/@dashboard/app/CardAccount';
import axiosConfig from '../utils/axiosConfig';

// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function DashboardApp() {
  const [cookies] = useCookies();
  const name = useSelector((state) => state.user.nama);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    renderAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAccount = () => {
    axiosConfig.post('/accounts/', { token: cookies.token }).then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  const [message, setMessage] = React.useState('No Message');
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const copy = (message) => {
    const newState = { vertical: 'bottom', horizontal: 'right' };
    setMessage(message);
    setState({ open: true, ...newState });
    setTimeout(() => {
      setState({ open: false, ...newState });
    }, 2000);
  };

  const countPage = Math.ceil(data.length / 6);
  const [indexFrom, setIndexFrom] = React.useState(-1);
  const [indexTo, setIndexTo] = React.useState(6);

  const changePage = (e, value) => {
    const page = value;
    const indexMax = page * 6;
    setIndexTo(indexMax);
    setIndexFrom(indexMax - 7);
  };

  const [loading, setLoading] = React.useState(true);

  return (
    <Page title="All Account">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container maxWidth="xl">
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} key={vertical + horizontal}>
            <Alert className="zindex" onClose={handleClose} severity="success">
              Success Copy {message} to clipboard.
            </Alert>
          </Snackbar>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Hi {name}
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/account/create"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Account
            </Button>
          </Stack>

          <Grid container spacing={3}>
            {data.map(
              (dataDalam, index) =>
                index > indexFrom &&
                index < indexTo && (
                  <Grid item xs={12} sm={6} md={4} key={dataDalam.id}>
                    <CardAccount
                      key={dataDalam.id}
                      idAccount={dataDalam._id}
                      rerender={renderAccount}
                      dataAccount={dataDalam}
                      copyProps={copy}
                      username={dataDalam.username}
                      password={dataDalam.password}
                      puuid={dataDalam.puuid}
                      owner={dataDalam.owner}
                      icon={'simple-icons:valorant'}
                    />
                  </Grid>
                )
            )}
          </Grid>
          <div className="flex-center">
            <Pagination count={countPage} shape="rounded" onChange={changePage} sx={{ mx: 'auto', my: 5 }} />
          </div>
        </Container>
      )}
    </Page>
  );
}

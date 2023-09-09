import { Container, Pagination, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link as RouterLink } from 'react-router-dom';
import CardCrosshair from '../components/CardCrosshair';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import WaitLoadData from '../components/WaitLoadData';
import axiosConfig from '../utils/axiosConfig';

const itemsPerPage = 5;

export default function Crosshair() {
  const [dataCrosshair, setDataCrosshair] = useState([]);
  const [cookies] = useCookies();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = () => {
    axiosConfig.post('/crosshair', { token: cookies.token }).then((response) => {
      setLoading(false);
      setDataCrosshair(response.data.data.filter((data) => data.delete !== true));
    });
  };
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dataCrosshair.slice(startIndex, endIndex);

  return (
    <Page title="Crosshair">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom component="div">
                Crosshair
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="/crosshair/create"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Crosshair
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-evenly' }}>
              {paginatedData.map((data, index) => (
                <CardCrosshair data={data} key={index} getData={getData} />
              ))}
            </Box>
          </Box>
        </Container>
      )}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination count={Math.ceil(dataCrosshair.length / itemsPerPage)} page={currentPage} onChange={handleChange} />
      </Box>
    </Page>
  );
}

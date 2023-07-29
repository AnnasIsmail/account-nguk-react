import { CircularProgress, Container, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link as RouterLink } from 'react-router-dom';
import CardCrosshair from '../components/CardCrosshair';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import axiosConfig from '../utils/axiosConfig';
    
export default function Crosshair(){

    const [dataCrosshair, setDataCrosshair] = useState([]);
    const [filterName, setFilterName] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        getData();
    }, []);
    
    const getData = () => {
        axiosConfig.post('/crosshair',{token: cookies.token})
        .then((response)=>{
            setLoading(false);
            setDataCrosshair(response.data.data.filter(data => data.delete !== true));
        }); 
    }

    const [loading , setLoading] = useState(true);
    const [kelamaan , setkelamaan] = useState(false);
    const [Textkelamaan , setTextkelamaan] = useState('API-nya masih ngantuk nih bang, sabar ya.');
  
    setTimeout(() => {
      setkelamaan(true);
    }, 5000);
  
    setTimeout(() => {
      setTextkelamaan('Buset dah tidur lagi ini API-nya bang, maap.');
    }, 10000);

    return(
        <Page title="Crosshair">
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
            <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom component="div">
                            Crosshair
                        </Typography>
                        <Button variant="contained" component={RouterLink} to="/crosshair/create" startIcon={<Iconify icon="eva:plus-fill" />}>
                            New Crosshair
                        </Button>
                    </Stack>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-evenly' }}>
                        {dataCrosshair.map((data, index)=>
                            <CardCrosshair data={data} key={index} getData={getData} />
                        )}
                    </Box>
                </Box>
            </Container>
}
        </Page>
    )
}
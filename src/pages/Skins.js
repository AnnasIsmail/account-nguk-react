// material
import { CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import SkinsList from '../sections/@dashboard/products/SkinsList';
// mock

// ----------------------------------------------------------------------

export default function Skins() {

  const [realAgents , setRealAgents] = React.useState([]);
  const [agents , setAgents] = React.useState([]);

  React.useEffect(()=>{
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) =>{
      setAgents(response.data.data);
      setRealAgents(response.data.data);
      setLoading(false);
    });
  },[]);

  function searchCall(){
    const value = document.getElementById('searchCall').value;
    document.getElementById('searchCall').value = value
    const AgentSearch = realAgents.filter(data => data.displayName.toLowerCase().includes(value.toLowerCase()));
    setAgents(AgentSearch);
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
    <Page title="All Skins">
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
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Skins
        </Typography>
          <SkinsList products={agents} />
      </Container>
}
      <input hidden type='button' onClick={searchCall} id='searchCall' />
    </Page>
  );
}

// material
import { CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import UpdateList from '../sections/@dashboard/products/UpdateList';
// mock

// ----------------------------------------------------------------------

export default function UpdateValorant() {

  const [realAgents , setRealAgents] = React.useState([]);
  const [agents , setAgents] = React.useState([]);

  React.useEffect(()=>{
    axios.get('https://api.henrikdev.xyz/valorant/v1/website/en-us').then((response) =>{
      setAgents(response.data.data);
      setRealAgents(response.data.data);
      setLoading(false);
      console.log(response)
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
    <Page title="Update Valorant">
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
          Update Valorant
        </Typography>
        <UpdateList products={agents} />
      </Container>
}
    </Page>
  );
}

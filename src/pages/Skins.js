// material
import { Container, Typography } from '@mui/material';
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
  const [loading , setLoading] = React.useState(false);

  React.useEffect(()=>{
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) =>{
      setAgents(response.data.data);
      setRealAgents(response.data.data);
      setLoading(true);
    });
  },[]);

  function searchCall(){
    const value = document.getElementById('searchCall').value;
    document.getElementById('searchCall').value = value
    const AgentSearch = realAgents.filter(data => data.displayName.toLowerCase().includes(value.toLowerCase()));
    setAgents(AgentSearch);
  }

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Skins
        </Typography>
        {(loading === true)?
          <SkinsList products={agents} />
        :
          <></>
        }
      </Container>
      <input hidden type='button' onClick={searchCall} id='searchCall' />
    </Page>
  );
}

// material
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import { ProductList } from '../sections/@dashboard/products';
// mock

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [agents , setAgents] = React.useState([]);
  const [loading , setLoading] = React.useState(false);

  React.useEffect(()=>{
    axios.get('https://valorant-api.com/v1/agents').then((response) =>{
      setAgents(response.data.data);
      setLoading(true);
    });
  },[]);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Agents
        </Typography>
        {(loading === true)?
          <ProductList products={agents} />
        :
          <></>
        }
      </Container>
    </Page>
  );
}

// material
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
// components
import Page from '../components/Page';
import WaitLoadData from '../components/WaitLoadData';
import ProductList from '../sections/@dashboard/products/ProductList';
// mock

// ----------------------------------------------------------------------

export default function Agents() {
  const [agents, setAgents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get('https://valorant-api.com/v1/agents').then((response) => {
      setAgents(response.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Page title="All Agents">
      {loading ? (
        <WaitLoadData loading={loading} />
      ) : (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            All Agents
          </Typography>
          <ProductList products={agents} />
        </Container>
      )}
    </Page>
  );
}

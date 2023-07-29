// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useCookies } from 'react-cookie';
// hooks
import { useParams } from 'react-router-dom';
// components
import Page from '../components/Page';
// sections
import LeftForm from '../components/LeftForm';
import EditAccountForm from '../sections/auth/register/EditAccountForm';
import axiosConfig from '../utils/axiosConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function EditAccount() {
  const { slug } = useParams();
  const [cookies] = useCookies();
  const [form, setForm] = React.useState();

  React.useEffect(() => {
    axiosConfig.post('/accounts/specific', { _id: slug, token: cookies.token }).then((response) => {
      setForm(<EditAccountForm dataAccount={response.data} />);
    });
  }, [cookies.token, slug]);

  return (
    <Page title="Edit Account" className="new-account-container">
      <RootStyle>
        <LeftForm text="Mohon Jujur Dalam Mengisi Form Ini." />
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Edit Account Valorant.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Masukan dengan sesuai. Bila tidak ingin rata.
            </Typography>
            {form}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
// components
import Page from '../components/Page';
// sections
import LeftForm from '../components/LeftForm';
import NewAccountForm from '../sections/auth/register/NewAccountForm';

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

export default function NewAccount() {
  return (
    <Page title="Create New Account" className="new-account-container">
      <RootStyle>
        <LeftForm text="Mohon Jujur Dalam Mengisi Form Ini." />
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Add New Account Valorant.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Masukan dengan sesuai. Bila tidak ingin rata.
            </Typography>
            <NewAccountForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

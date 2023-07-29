// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
// components
import Page from '../components/Page';
// sections
import LeftForm from '../components/LeftForm';
import TrackForm from '../sections/auth/register/TrackForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: 'calc(100vh - 200px)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function TrackAccount() {
  return (
    <Page title="Track Account" className="new-account-container">
      <RootStyle>
        <LeftForm text="Mohon Jujur Dalam Mengisi Form Ini." />
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Track Account Valorant
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Profile Private? Gangaruh Banh.</Typography>
            <TrackForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

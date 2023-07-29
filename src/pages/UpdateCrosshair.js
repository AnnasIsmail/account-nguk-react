// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
// components
import Page from '../components/Page';
// sections
import LeftForm from '../components/LeftForm';
import UpdateCrosshairForm from '../sections/auth/register/UpdateCrosshairForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  //   minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function UpdateCrosshair() {
  return (
    <Page title="Add New Access" className="new-account-container">
      <RootStyle>
        <LeftForm text="Mohon Jujur Dalam Mengisi Form Ini." />
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Edit Crosshair
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Name and code the Crosshair you want to edit.
            </Typography>
            <UpdateCrosshairForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

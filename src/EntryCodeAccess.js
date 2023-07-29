// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// hooks
import EntryCodeAccessForm from './EntryCodeAccessForm';
import LeftForm from './components/LeftForm';
import Page from './components/Page';
import WaitLoadDataWithBackdrop from './components/WaitLoadDataWithBackdrop';
// components
// sections

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

EntryCodeAccess.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default function EntryCodeAccess({ isLoading }) {
  return (
    <Page title="Entry Code Access" className="new-account-container">
      {isLoading ? (
        <WaitLoadDataWithBackdrop loading={isLoading} />
      ) : (
        <RootStyle>
          <LeftForm text="Masukan Form ini dengan sesuai." />
          <Container>
            <ContentStyle>
              <Typography variant="h4" gutterBottom>
                Enter Your Email
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Enter you and you will get an OTP code to be able to view the contents of this website.
              </Typography>

              <EntryCodeAccessForm />
            </ContentStyle>
          </Container>
        </RootStyle>
      )}
    </Page>
  );
}

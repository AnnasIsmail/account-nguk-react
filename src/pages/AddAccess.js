// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// hooks
// components
import Page from '../components/Page';
// sections
import LeftForm from '../components/LeftForm';
import AddAccessForm from '../sections/auth/register/AddAccessForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AddAccess() {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.role);

  if (isAdmin !== 'admin') {
    navigate('/404', { replace: true });
  }

  return (
    <Page title="Add New Access" className="new-account-container">
      <RootStyle>
        <LeftForm text="Mohon Jujur Dalam Mengisi Form Ini." />
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              New Access
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Give the Name You Want to Give Access.</Typography>
            <AddAccessForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

// @mui
import { Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// hooks
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import EditAccountForm from '../sections/auth/register/EditAccountForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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
  const navigate = useNavigate();
  const { slug } = useParams();

  const smUp = useResponsive('up', 'sm');
  const [form , setForm] = React.useState();
  const mdUp = useResponsive('up', 'md');

  React.useEffect(()=>{
    
    axios.get(`http://127.0.0.1:8000/api/account/${slug}`).then((response) =>{
      response.data.data.forEach(data=>{
        setForm(<EditAccountForm dataAccount={data} />);
      });
    });

  },[]);

  return (
    <Page title="Edit Account" className="new-account-container">
      <RootStyle>
        

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt:-5 , mb: 3 }}>
              Mohon Jujur Dalam Mengisi Form Ini.
            </Typography>
            <img alt="register" src="https://cdnb.artstation.com/p/assets/images/images/046/348/769/large/gop-gap-gg080.jpg?1644915253" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Add New Account Valorant.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Masukan dengan sesuai. Bila tidak ingin rata.</Typography>

            {form}
            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

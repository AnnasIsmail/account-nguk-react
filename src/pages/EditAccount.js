// @mui
import { Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
// hooks
import { useNavigate, useParams } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import EditAccountForm from '../sections/auth/register/EditAccountForm';
import axiosConfig from '../utils/axiosConfig';

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
  const [cookies, setCookie, removeCookie] = useCookies();

  const smUp = useResponsive('up', 'sm');
  const [form , setForm] = React.useState();
  const mdUp = useResponsive('up', 'md');

  const [loading , setLoading] = React.useState(false);
  const [srcImage , setSrcImage] = React.useState();
  const [nameSkins , setNameSkins] = React.useState();

  React.useEffect(()=>{
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) =>{
      const random = Math.floor(Math.random() * response.data.data.length);
      if(response.data.data[random].displayIcon !== null){
        setSrcImage(response.data.data[random].displayIcon);
      }else{
        setSrcImage(response.data.data[random].chromas[0].displayIcon);
      }
      setNameSkins(response.data.data[random].displayName);
      setLoading(true);
    });
  },[]);

  React.useEffect(()=>{
    axiosConfig.post('/accounts/specific',{_id: slug, token: cookies.token})
    .then((response) =>{
        setForm(<EditAccountForm dataAccount={response.data} />);
    });

  },[]);

  return (
    <Page title="Edit Account" className="new-account-container">
      <RootStyle>
        

      {mdUp && (
          <SectionStyle>
            <Typography variant="h4" sx={{ p: 3 }}>
              Mohon Jujur Dalam Mengisi Form Ini.
            </Typography>
            {(loading)?
              <>
                <img alt="Random Skins" src={srcImage} sx={{ p: 3 }} />
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }} gutterBottom>
                  {nameSkins}
                </Typography>
              </>
            :
              <></>
            }
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Edit Account Valorant.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Masukan dengan sesuai. Bila tidak ingin rata.</Typography>

            {form}
            
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

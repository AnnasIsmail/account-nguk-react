// @mui
import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

DetailAccount.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function DetailAccount({ title, total, icon, color = 'primary', sx, ...other }) {

    const [name , setName] = React.useState();
    const [tag , setTag] = React.useState();
    const [rank , setRank] = React.useState();
    const [loading , setLoading] = React.useState(false);
    const [exp , setExp] = React.useState();
    const [elo , setElo] = React.useState();

  return (
    <Card
      sx={{
        py: 4,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <img src="https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/smallicon.png" alt="rank" width={45} height={45} />
      </IconWrapperStyle>

      <Typography variant="subtitle1" sx={{ opacity: 0.8 , m: 0 }}>
        Gold 2
      </Typography>

      <LinearProgressWithLabel value={20} />

      <Typography variant="h4">Irjen</Typography>

      <Typography variant="subtitle2" className='detail-account' sx={{ opacity: 0.72 }}>
        <b>Level :</b>
        198
      </Typography>

      <Typography variant="subtitle2" className='detail-account' sx={{ opacity: 0.72 }}>
        <b>Elo :</b>
        198
      </Typography>

      <CardActions className='bottom-card-account'>
        <div>
          <Button className='button-bottom' target="_blank" href={`https://tracker.gg/valorant/profile/riot/${name}%23${tag}/overview`} color={color} size="small">Tracker.gg</Button>
          <Button className='button-bottom' target="_blank" href={`https://auth.riotgames.com/login#acr_values=urn%3Ariot%3Agold&client_id=accountodactyl-prod&redirect_uri=https%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in&response_type=code&scope=openid%20email%20profile%20riot%3A%2F%2Friot.atlas%2Faccounts.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%20riot%3A%2F%2Friot.atlas%2Faccounts.auth%20riot%3A%2F%2Fthird_party.revoke%20riot%3A%2F%2Fthird_party.query%20riot%3A%2F%2Fforgetme%2Fnotify.write%20riot%3A%2F%2Friot.authenticator%2Fauth.code%20riot%3A%2F%2Friot.authenticator%2Fauthz.edit%20riot%3A%2F%2Frso%2Fmfa%2Fdevice.write&state=4d7f39cb-9920-4700-a11f-e742346bba80&ui_locales=en`} color={color} size="small">Riot Account</Button>
          <Button className='button-bottom' onClick={()=>openDetailSkin(puuid , 'MMR')} color={color} size="small">History MMR</Button>
        </div>
      </CardActions>

    </Card>
  );
}

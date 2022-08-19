// @mui
import { Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
//
import BackdropLoading from '../../@dashboard/app/BackDropLoading';
import DetailMMR from '../../@dashboard/app/DetailMMR';

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

export default function DetailAccount({ data , puuid , color = 'primary', sx, ...other }) {
  
    const [rank , setRank] = React.useState();
    const [srcRank , setSrcRank] = React.useState();
    const [loading , setLoading] = React.useState(true);
    const [exp , setExp] = React.useState();
    const [elo , setElo] = React.useState();

    React.useEffect(()=>{
      axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${data.region}/${data.puuid}`).then((response) =>{
        setRank(response.data.data.currenttierpatched);
        setElo(response.data.data.elo);
        setSrcRank(response.data.data.images.small);
        setExp(response.data.data.ranking_in_tier);
        setLoading(false);
      });
    },[]);

    const [openDetailMMR, setOpenDetailMMR] = React.useState(false);
    const [detailMMR,setDetailMMR] = React.useState([]);
    const handleCloseDetailMMR = () => setOpenDetailMMR(false);

    const [openBackDrop , setOpenBackdrop] = React.useState(false);

    const handleCloseBackDrop = () => {
      setOpenBackdrop(false);
    };
    const handleToggleBackDrop = () => {
      setOpenBackdrop(!openBackDrop);
    };

    const openDetailSkin =(uuid , name)=> {
    handleToggleBackDrop();
        axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/ap/${uuid}`).then((response) =>{
          handleCloseBackDrop();
          setDetailMMR(response.data);
          setOpenDetailMMR(true);
      });
    }

  return (
    <>
    <BackdropLoading open={openBackDrop} />
    <Card
      sx={{
        pt: 4,
        pb: 1,
        px: 2,
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
        {(loading)?
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        :
          <img src={srcRank} alt="rank" width={45} height={45} />
        }
      </IconWrapperStyle>


        {(loading)?
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
          :
          <Typography variant="subtitle1" sx={{ opacity: 0.8 , m: 0 }}>
              {rank}
          </Typography>
        }

        {(loading)?
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        :
          <LinearProgressWithLabel value={exp} />
        }

      <Typography variant="h4">{data.name}#{data.tag}</Typography>

      <Typography variant="subtitle2" className='detail-account' sx={{ opacity: 0.72 }}>
        <b>Level :</b>
        {data.account_level}
      </Typography>

      <Typography variant="subtitle2" className='detail-account' sx={{ opacity: 0.72 }}>
      {(loading)?
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        :
          <>
            <b>Elo :</b>
            {elo}
          </>
        }
      </Typography>

      <CardActions className='bottom-card-account'>
        <div>
          <Button className='button-bottom' target="_blank" href={`https://tracker.gg/valorant/profile/riot/${data.name}%23${data.tag}/overview`} color={color} size="small">Tracker.gg</Button>
          <Button className='button-bottom' onClick={()=>openDetailSkin(data.puuid , 'MMR')} color={color} size="small">History MMR</Button>
        </div>
      </CardActions>
      <DetailMMR open={openDetailMMR} handleClose={handleCloseDetailMMR} detailSkin={detailMMR} />
    </Card>
    </>

  );
}

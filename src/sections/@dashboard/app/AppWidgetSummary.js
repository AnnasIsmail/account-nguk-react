// @mui
import { Card, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// components
import Iconify from '../../../components/Iconify';
import DetailAgent from './DetailAgent';
import DetailSkin from './DetailSkin';

// ----------------------------------------------------------------------

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

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  RiotId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

const Alert = React.forwardRef((props, ref)=> {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AppWidgetSummary({  dataSkin, dataAgent, username, password, RiotIdTagLine, owner, riotId, tagLine, icon, copyProps,  idAccount, color = 'primary', sx, ...other }) {

  const [expanded, setExpanded] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [detailSkin,setDetailSkin] = React.useState([]);
  const handleCloseDetailSkin = () => setOpenDetail(false);

  const [openDetailAgent, setOpenDetailAgent] = React.useState(false);
  const [detailAgent,setDetailAgent] = React.useState([]);
  const handleCloseDetailAgent = () => setOpenDetailAgent(false);
  
  const [open, setOpen] = React.useState(false);

  const srcRank = 'https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e48a390db8b1/0/smallicon.png';
  const [rank , setRank] = React.useState();
  const [loading , setLoading] = React.useState(false);
  const [exp , setExp] = React.useState();
  const [elo , setElo] = React.useState();

  React.useEffect(()=>{
    axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/ap/${riotId}/${tagLine}`).then((response) =>{
        setRank(response.data.data.images.small);
        setExp(response.data.data.ranking_in_tier);
        setElo(response.data.data.elo);
        setLoading(true);
      });
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    if(e === 'agree'){
      axios.post(`http://127.0.0.1:8000/api/account/delete/${idAccount}`).then((response) =>{
        axios.post(`http://127.0.0.1:8000/api/skin/delete/${idAccount}`).then((response) =>{
          axios.post(`http://127.0.0.1:8000/api/agent/delete/${idAccount}`).then((response) =>{
            setOpen(false);
            document.location.reload();
          });
        });
      });
    }else{
      setOpen(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const copy =(message, text)=>{
    copyProps(message);
    navigator.clipboard.writeText(text);
  }

  const openDetailSkin =(uuid , name)=> {
    if(name === 'skin'){
      axios.get(`https://valorant-api.com/v1/weapons/skins/${uuid}`).then((response) =>{
        setDetailSkin(response.data.data);
        setOpenDetail(true);
      });
    }else{
        axios.get(`https://valorant-api.com/v1/agents/${uuid}`).then((response) =>{
          setDetailAgent(response.data.data);
          setOpenDetailAgent(true);
          
      });
    }
  }

  return (
    
    <Card
      sx={{
        pt: 3,
        pb: 1,
        boxShadow: 0,
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
        {loading === false ?
          <Skeleton variant="circular"><Avatar /></Skeleton>
        :
          <img src={rank} alt='asd' width={35} height={35} /> 
        }
      </IconWrapperStyle>

      {loading === false ?
        <Skeleton width="100%"><Typography>.</Typography></Skeleton>
        :
        <LinearProgressWithLabel className='exp' value={exp} />
      }

      <Typography className='RiotIdCard' sx={{ px:2 }} variant="h5">{RiotIdTagLine}</Typography>

      <Typography variant="subtitle2" className='data-account' sx={{ opacity: 0.72 }}>
        Username: {username}
        <Button color={color} onClick={()=>copy('Username', username)} >
          <Iconify icon='fluent:copy-16-filled' width={24} height={24} />
        </Button>
      </Typography>

      <Typography variant="subtitle2" className='data-account' sx={{ opacity: 0.72 }}>
        Password: {password}
        <Button color={color} onClick={()=>copy('Password', password)} >
          <Iconify icon='fluent:copy-16-filled' width={24} height={24} />
        </Button>
      </Typography>

      <CardActions className='bottom-card-account'>
        <div>
          <Button className='button-bottom' target="_blank" href={`https://tracker.gg/valorant/profile/riot/${riotId}%23${tagLine}/overview`} color={color} size="small">Tracker.gg</Button>
          <Button className='button-bottom' target="_blank" href={`https://auth.riotgames.com/login#acr_values=urn%3Ariot%3Agold&client_id=accountodactyl-prod&redirect_uri=https%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in&response_type=code&scope=openid%20email%20profile%20riot%3A%2F%2Friot.atlas%2Faccounts.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%20riot%3A%2F%2Friot.atlas%2Faccounts.auth%20riot%3A%2F%2Fthird_party.revoke%20riot%3A%2F%2Fthird_party.query%20riot%3A%2F%2Fforgetme%2Fnotify.write%20riot%3A%2F%2Friot.authenticator%2Fauth.code%20riot%3A%2F%2Friot.authenticator%2Fauthz.edit%20riot%3A%2F%2Frso%2Fmfa%2Fdevice.write&state=4d7f39cb-9920-4700-a11f-e742346bba80&ui_locales=en`} color={color} size="small">Riot Account</Button>
        </div>
        <Button  onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className='button-bottom' color={color} size="small">
          <Iconify icon='ic:twotone-expand-more' width={24} height={24} />
          </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Pemilik: {owner}</Typography>
          {loading === false ?
            <Skeleton width="100%"><Typography>.</Typography></Skeleton>
            :
            <Typography paragraph>Elo: {elo}</Typography>
          }
          <Typography className='paragraph-detail-account' paragraph>Skins: 
            <br />
            {
            dataSkin.filter((dataFilter)=> parseInt(dataFilter.account_id , 10) === idAccount).map((data , index)=>{
                return (
                  <Chip color={color} key={index} label={data.name}  onClick={()=>openDetailSkin(data.uuid , 'skin')} component="a" clickable />
                );
              
            })
          }
            {(dataSkin.filter((dataFilter)=> parseInt(dataFilter.account_id , 10) === idAccount).length === 0)?
              <Chip color={color} label="Gosong"  component="a" href="#basic-chip" clickable />
              :
              <></>
            }
          </Typography>

          <Typography className='paragraph-detail-account' paragraph>Agents: 
            <br />
            {
            dataAgent.filter((dataFilter)=> parseInt(dataFilter.account_id , 10) === idAccount).map((data , index)=>{
                return (
                  <Chip color={color} key={index} label={data.name}  onClick={()=>openDetailSkin(data.uuid , 'agent')} component="a" clickable />
                );
              
            })
          }
            {(dataAgent.filter((dataFilter)=> parseInt(dataFilter.account_id , 10) === idAccount).length === 0)?
              <Chip color={color} label="Bot"  component="a" href="#basic-chip" clickable />
              :
              <></>
            }
          </Typography>
          <Button className='button-bottom' href={`/account/edit/${idAccount}`} color={color} size="small">Edit Account</Button>
          <Button className='button-bottom' onClick={handleClickOpen} color={color} size="small">Delete Account</Button>

        </CardContent>
      </Collapse>

    <DetailSkin open={openDetail} handleClose={handleCloseDetailSkin} detailSkin={detailSkin} />
    <DetailAgent open={openDetailAgent} handleClose={handleCloseDetailAgent} detailSkin={detailAgent} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you sure delete <b> {RiotIdTagLine} </b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleClose('disagree')}>Disagree</Button>
          <Button onClick={()=> handleClose('agree')} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

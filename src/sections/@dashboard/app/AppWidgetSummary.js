// @mui
import { Card, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
// utils
import axios from 'axios';

// components
import Iconify from '../../../components/Iconify';
import DetailAgent from './DetailAgent';
import DetailSkin from './DetailSkin';

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

export default function AppWidgetSummary({ username, password, RiotIdTagLine, owner, riotId, tagLine, icon, copyProps, dataSkin, dataAgent, idAccount, color = 'error', sx, ...other }) {

  const [expanded, setExpanded] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [detailSkin,setDetailSkin] = React.useState([]);
  const handleCloseDetailSkin = () => setOpenDetail(false);

  const [openDetailAgent, setOpenDetailAgent] = React.useState(false);
  const [detailAgent,setDetailAgent] = React.useState([]);
  const handleCloseDetailAgent = () => setOpenDetailAgent(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(dataAgent)

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
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

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
          <Button className='button-bottom' target="_blank" href={`https://auth.riotgames.com/login`} color={color} size="small">Edit Account</Button>
        </div>
        <Button  onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className='button-bottom' color={color} size="small">
          <Iconify icon='ic:twotone-expand-more' width={24} height={24} />
          </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Pemilik: {owner}</Typography>
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
        </CardContent>
      </Collapse>

    <DetailSkin open={openDetail} handleClose={handleCloseDetailSkin} detailSkin={detailSkin} />
    <DetailAgent open={openDetailAgent} handleClose={handleCloseDetailAgent} detailSkin={detailAgent} />
    </Card>
  );
}

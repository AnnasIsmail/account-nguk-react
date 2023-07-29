// @mui
import { Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
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
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// components
import Iconify from '../../../components/Iconify';
import axiosConfig from '../../../utils/axiosConfig';
import BackdropLoading from './BackDropLoading';
import DetailAgent from './DetailAgent';
import DetailMMR from './DetailMMR';
import DetailRank from './DetailRank';
import DetailSkin from './DetailSkin';

// ----------------------------------------------------------------------

LinearProgressWithLabel.propTypes = {
  value: PropTypes.string,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
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

CardAccount.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  RiotId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
  puuid: PropTypes.string.isRequired,
  rerender: PropTypes.func.isRequired,
  copyProps: PropTypes.func.isRequired,
  dataAccount: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired,
  idAccount: PropTypes.string.isRequired,
};

export default function CardAccount({
  puuid,
  rerender,
  dataAccount,
  username,
  password,
  owner,
  copyProps,
  idAccount,
  color = 'primary',
  sx,
  ...other
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [detailSkin, setDetailSkin] = React.useState([]);
  const handleCloseDetailSkin = () => setOpenDetail(false);
  const [openDetailAgent, setOpenDetailAgent] = React.useState(false);
  const [detailAgent, setDetailAgent] = React.useState([]);
  const handleCloseDetailAgent = () => setOpenDetailAgent(false);
  const [openDetailMMR, setOpenDetailMMR] = React.useState(false);
  const [detailMMR, setDetailMMR] = React.useState([]);
  const handleCloseDetailMMR = () => setOpenDetailMMR(false);
  const [openDetailRank, setOpenDetailRank] = React.useState(false);
  const [detailRank, setDetailRank] = React.useState([]);
  const handleCloseDetailRank = () => setOpenDetailRank(false);
  const [openBackDrop, setOpenBackdrop] = React.useState(false);

  const handleCloseBackDrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackDrop = () => {
    setOpenBackdrop(!openBackDrop);
  };

  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState();
  const [nameRank, setNameRank] = React.useState();
  const [tag, setTag] = React.useState();
  const [rank, setRank] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [exp, setExp] = React.useState();
  const [elo, setElo] = React.useState();
  const [cookies] = useCookies();

  React.useEffect(() => {
    axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/ap/${puuid}`).then((response) => {
      setNameRank(response.data.data.currenttierpatched);
      setName(response.data.data.name);
      setTag(response.data.data.tag);
      setRank(response.data.data.images.small);
      setExp(response.data.data.ranking_in_tier);
      setElo(response.data.data.elo);
      setLoading(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const identity = useSelector((state) => state.user?.identity || undefined);
  const nama = useSelector((state) => state.user.nama || undefined);
  const email = useSelector((state) => state.user.email || undefined);

  const handleClose = (e) => {
    if (e === 'agree') {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const objectLog = {
        name: nama,
        email,
        identity,
        browser: cookies.browser,
        activity: `Deleted Account id: ${idAccount}, Riot ID: ${name}, Tag Line: ${tag},  PUUID: ${puuid}`,
        created_at: today.toISOString(),
      };
      axiosConfig.post('/accounts/delete', { idAccount, token: cookies.token }).then((response) => {
        if (response.status === 200) {
          axiosConfig.post('/logs/create', objectLog).then(() => {
            setOpen(false);
            rerender();
          });
        }
      });
    } else {
      setOpen(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const copy = (message, text) => {
    copyProps(message);
    navigator.clipboard.writeText(text);
  };

  const openDetailSkin = (uuid, name) => {
    handleToggleBackDrop();
    if (name === 'skin') {
      axios.get(`https://valorant-api.com/v1/weapons/skins/${uuid}`).then((response) => {
        handleCloseBackDrop();
        setDetailSkin(response.data.data);
        setOpenDetail(true);
      });
    } else if (name === 'agent') {
      axios.get(`https://valorant-api.com/v1/agents/${uuid}`).then((response) => {
        handleCloseBackDrop();
        setDetailAgent(response.data.data);
        setOpenDetailAgent(true);
      });
    } else if (name === 'MMR') {
      axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr-history/ap/${uuid}`).then((response) => {
        handleCloseBackDrop();
        setDetailMMR(response.data);
        setOpenDetailMMR(true);
      });
    } else if (name === 'Rank') {
      axios.get(`https://api.henrikdev.xyz/valorant/v2/mmr/ap/${uuid}`).then((response) => {
        handleCloseBackDrop();
        setDetailRank(response.data);
        setOpenDetailRank(true);
      });
    }
  };
  return (
    <>
      <BackdropLoading open={openBackDrop} />
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
          {loading === false ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <img src={rank} alt="asd" width={35} height={35} />
          )}
        </IconWrapperStyle>

        <Typography variant="subtitle1" sx={{ opacity: 0.8, textAlign: 'center' }}>
          {nameRank}
        </Typography>

        {loading === false ? (
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <LinearProgressWithLabel className="exp" value={exp} />
        )}

        <Typography className="RiotIdCard" sx={{ px: 2 }} variant="h5">
          {/* {RiotIdTagLine} */}
          {loading === false ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            `${name}#${tag}`
          )}
        </Typography>

        <Typography variant="subtitle2" className="data-account" sx={{ opacity: 0.72 }}>
          Username: ************
          <Button color={color} onClick={() => copy('Username', username)}>
            <Iconify icon="fluent:copy-16-filled" width={24} height={24} />
          </Button>
        </Typography>

        <Typography variant="subtitle2" className="data-account" sx={{ opacity: 0.72 }}>
          Password: ************
          <Button color={color} onClick={() => copy('Password', password)}>
            <Iconify icon="fluent:copy-16-filled" width={24} height={24} />
          </Button>
        </Typography>

        <CardActions className="bottom-card-account">
          <div>
            <Button
              className="button-bottom"
              target="_blank"
              href={`https://tracker.gg/valorant/profile/riot/${name}%23${tag}/overview`}
              color={color}
              size="small"
            >
              Tracker.gg
            </Button>
            <Button
              disabled={!loading}
              className="button-bottom"
              target="_blank"
              onClick={() => openDetailSkin(`${name}/${tag}`, 'Rank')}
              color={color}
              size="small"
            >
              History Rank
            </Button>
            <Button className="button-bottom" onClick={() => openDetailSkin(puuid, 'MMR')} color={color} size="small">
              History MMR
            </Button>
          </div>
          <Button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="button-bottom"
            color={color}
            size="small"
          >
            <Iconify icon="ic:twotone-expand-more" width={24} height={24} />
          </Button>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Pemilik: {owner}</Typography>
            {loading === false ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography paragraph>Elo: {elo}</Typography>
            )}
            <Typography className="paragraph-detail-account" paragraph>
              Skins:
              <br />
              {dataAccount.skin.length === 0 ? (
                <Chip color={color} label="Gosong" component="a" href="#basic-chip" />
              ) : (
                dataAccount.skin.map((data, index) => (
                  <Chip
                    color={color}
                    key={index}
                    label={data.name}
                    onClick={() => openDetailSkin(data.uuid, 'skin')}
                    component="a"
                    clickable
                  />
                ))
              )}
            </Typography>

            <Typography className="paragraph-detail-account" paragraph>
              Agents:
              <br />
              {dataAccount.agent.length === 0 ? (
                <Chip color={color} label="Gosong" component="a" href="#basic-chip" />
              ) : (
                dataAccount.agent.map((data, index) => (
                  <Chip
                    color={color}
                    key={index}
                    label={data.name}
                    onClick={() => openDetailSkin(data.uuid, 'agent')}
                    component="a"
                    clickable
                  />
                ))
              )}
            </Typography>
            <Button
              className="button-bottom"
              component={RouterLink}
              to={`/account/edit/${idAccount}`}
              color={color}
              size="small"
            >
              Edit Account
            </Button>
            <Button className="button-bottom" onClick={handleClickOpen} color={color} size="small">
              Delete Account
            </Button>
            <Button
              className="button-bottom"
              target="_blank"
              href={`https://auth.riotgames.com/login#acr_values=urn%3Ariot%3Agold&client_id=accountodactyl-prod&redirect_uri=https%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in&response_type=code&scope=openid%20email%20profile%20riot%3A%2F%2Friot.atlas%2Faccounts.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%20riot%3A%2F%2Friot.atlas%2Faccounts.auth%20riot%3A%2F%2Fthird_party.revoke%20riot%3A%2F%2Fthird_party.query%20riot%3A%2F%2Fforgetme%2Fnotify.write%20riot%3A%2F%2Friot.authenticator%2Fauth.code%20riot%3A%2F%2Friot.authenticator%2Fauthz.edit%20riot%3A%2F%2Frso%2Fmfa%2Fdevice.write&state=4d7f39cb-9920-4700-a11f-e742346bba80&ui_locales=en`}
              color={color}
              size="small"
            >
              Riot Account
            </Button>
          </CardContent>
        </Collapse>

        <DetailSkin open={openDetail} handleClose={handleCloseDetailSkin} detailSkin={detailSkin} />
        <DetailAgent open={openDetailAgent} handleClose={handleCloseDetailAgent} detailSkin={detailAgent} />
        <DetailMMR open={openDetailMMR} handleClose={handleCloseDetailMMR} detailSkin={detailMMR} />
        <DetailRank open={openDetailRank} handleClose={handleCloseDetailRank} detailSkin={detailRank} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Warning Delete Account'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you sure delete{' '}
              <b>
                {' '}
                {name}#{tag}{' '}
              </b>{' '}
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('disagree')}>Cancel</Button>
            <Button onClick={() => handleClose('agree')} autoFocus sx={{ color: 'red' }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}

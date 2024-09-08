import MoreVertIcon from '@mui/icons-material/MoreVert';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';
import AlertDelete from './AlertDelete';
import Iconify from './Iconify';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

CardCrosshair.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  getData: PropTypes.func.isRequired,
};

export default function CardCrosshair(props) {
  const [src, setSrc] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const arrayBackground = [
    'https://www.vcrdb.net/img/bgs/default.webp',
    'https://www.vcrdb.net/img/bgs/green.webp',
    'https://www.vcrdb.net/img/bgs/metall.webp',
    'https://www.vcrdb.net/img/bgs/blaugelb.webp',
    'https://www.vcrdb.net/img/bgs/yellow.webp',
    'https://www.vcrdb.net/img/bgs/orange.webp',
    'https://www.vcrdb.net/img/bgs/blue.webp',
    'https://www.vcrdb.net/img/bgs/grass.webp',
    'https://www.vcrdb.net/img/bgs/sky.webp',
  ];
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.henrikdev.xyz/valorant/v1/crosshair/generate?id=${props.data.code}`, {Authorization: 'HDEV-546994ff-f305-4d59-a37b-fdad32b442f5'})
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setSrc(url);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data.code]);

  const handleClick = () => {
    navigator.clipboard.writeText(props.data.code);
    const newState = { vertical: 'bottom', horizontal: 'right' };
    setState({ open: true, ...newState });
    setTimeout(() => {
      setState({ open: false, ...newState });
    }, 2000);
  };

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const [cookies] = useCookies();
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const identity = useSelector((state) => state.user?.identity || undefined);
  const email = useSelector((state) => state.user.email || undefined);
  const editor = useSelector((state) => state.user.nama);

  const deleteCrosshair = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objectLog = {
      name: editor,
      email,
      identity,
      browser: cookies.browser,
      created_at: today.toISOString(),
    };

    axiosConfig.post(`crosshair/delete`, { _id: props.data._id, delete: true, token: cookies.token }).then(() => {
      objectLog.activity = `Deleted Crosshair Name: ${props.data.name}, ID:${props.data._id} Code: ${props.data.code}`;
      axiosConfig.post('/logs/create', objectLog).then((response) => {
        if (response.status === 200) {
          setOpenDelete(false);
          props.getData();
        }
      });
    });
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleDelete = () => {
    handleCloseMenu();
    setOpenDelete(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{ pb: 0 }}>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
          {loading ? (
            <Skeleton variant="rectangular" sx={{ width: '128px', height: '128px', borderRadius: '10px' }} />
          ) : (
            <div>
              <img
                src={arrayBackground[index]}
                alt="background"
                style={{ height: '128px', width: '128px', borderRadius: '10px' }}
              />
              <img
                src={src}
                alt="crosshair"
                style={{ height: '128px', width: '128px', position: 'absolute', top: '24px' }}
              />
            </div>
          )}
        </div>
        <Typography gutterBottom variant="h5" sx={{ mb: '-2px', pt: '10px' }} component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {props.data.author}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small" onClick={handleClick}>
          <Iconify icon="fluent:copy-16-filled" width={24} height={24} />
        </Button>
        <Button size="small" onClick={() => setIndex(index < arrayBackground.length - 1 ? index + 1 : 0)}>
          <Iconify icon="ic:round-change-circle" width={24} height={24} />
        </Button>
        <IconButton
          id="basic-button"
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClickMenu}
          aria-label="settings"
        >
          <MoreVertIcon color="primary" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          aria-haspopup="true"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => navigate(`/crosshair/edit/${props.data._id}`)}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Remove</MenuItem>
        </Menu>
      </CardActions>

      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} key={vertical + horizontal}>
        <Alert className="zindex" onClose={handleClose} severity="success">
          Success Copy {props.data.name} to clipboard.
        </Alert>
      </Snackbar>
      <AlertDelete
        open={openDelete}
        actionDelete={deleteCrosshair}
        handleClose={() => setOpenDelete(false)}
        message={`Apakah kamu yakin ingin menghapus croshhair ${props.data.name}`}
      />
    </Card>
  );
}

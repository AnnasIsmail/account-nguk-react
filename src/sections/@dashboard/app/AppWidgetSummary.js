// @mui
import { Card, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
// utils

// components
import Iconify from '../../../components/Iconify';


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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AppWidgetSummary({ username, password, RiotId, icon, color = 'error', sx, ...other }) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

      <Typography className='RiotIdCard' variant="h4">{RiotId}</Typography>

      <Typography variant="subtitle1" className='data-account' sx={{ opacity: 0.72 }}>
        Username: {username}
        <Button color={color} onClick={() => { console.log('onClick'); }}>
          <Iconify icon='fluent:copy-16-filled' width={24} height={24} />
        </Button>
      </Typography>

      <Typography variant="subtitle1" className='data-account' sx={{ opacity: 0.72 }}>
        Password: {password}
        <Button color={color} onClick={() => { console.log('onClick'); }}>
          <Iconify icon='fluent:copy-16-filled' width={24} height={24} />
        </Button>
      </Typography>

      <CardActions className='bottom-card-account'>
        <div>
          <Button className='button-bottom' color={color} size="small">Tracker.gg</Button>
          <Button className='button-bottom' color={color} size="small">Edit Account</Button>
        </div>
        <Button expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className='button-bottom' color={color} size="small">
          <Iconify icon='ic:twotone-expand-more' width={24} height={24} />
          </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Pemilik: Annas</Typography>
          <Typography paragraph>Skin: 
          <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
          <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
                    <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
                    <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
                    <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
                    <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
          </Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
}

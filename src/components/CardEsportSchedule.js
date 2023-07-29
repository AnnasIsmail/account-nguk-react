/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import * as React from 'react';
import ModalDetailEsport from './ModalDetailEsport';

export default function CardEsportSchedule({ data }) {

  const [detailEsport, setDetailEsport] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    setDetailEsport(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'transparent' }} aria-label="recipe">
            <img src={data.league.icon} />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={<Link href={`https://www.youtube.com/results?search_query=${data.league.name}`} target='_blank' underline="none">{data.league.name}</Link>}
        subheader={data.league.region}
      />
      <CardContent>

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List sx={{ mb: '10px' }}>
          <ListItem disablePadding >
              <ListItemButton onClick={()=>handleOpen(data.match.teams[0])} sx={{ justifyContent: 'space-evenly', borderRadius: '10px', bgcolor: data.state === 'completed' && data.match.teams[0]?.has_won ? '#54D62C' : data.state === 'unstarted'? 'transparent': data.state === 'inProgress' ? '#FFC107' : '#FF4842',}}>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                {(data.match.teams[0])?data.match.teams[0].name:''} ({(data.match.teams[0])?data.match.teams[0].code:''})
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
              <ListItemText primary="VS" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>handleOpen(data.match.teams[1])} sx={{ justifyContent: 'space-evenly', borderRadius: '10px', bgcolor: data.state === 'completed' && data.match.teams[1]?.has_won ? '#54D62C' : data.state === 'unstarted'? 'transparent': data.state === 'inProgress' ? '#FFC107' : '#FF4842',}}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                {(data.match.teams[1])?data.match.teams[1].name:''} ({(data.match.teams[1])?data.match.teams[1].code:''})
            </Typography>
            </ListItemButton>
          </ListItem>
        </List>
    </Box>

        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center", pt: '10px' }}>
          {moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss A")}
        </Typography>
      </CardContent>
      <ModalDetailEsport data={detailEsport} open={open} handleClose={handleClose} />
    </Card>
  );
}
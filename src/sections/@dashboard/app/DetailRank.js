import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/Iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto'
};

export default function DetailRank(props) {
  let levels = [];
  let detailSkin = {};
  
  if(props.detailSkin.data !== undefined){
    levels = props.detailSkin.data;
  }

  if(props.detailSkin.data !== undefined){
    detailSkin = props.detailSkin;
  }

  let renderedData;
  
  if(detailSkin.data?.by_season){
    renderedData = Object.keys(detailSkin.data?.by_season).map(key => {
      const item = detailSkin.data?.by_season[key];

      return(
        // eslint-disable-next-line react/jsx-key
        <Accordion>
          <AccordionSummary
            expandIcon={<Iconify icon='ic:twotone-expand-more' width={24} height={24} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {('error' in item)?
            <Typography color='error' variant='h6' >{key.replace("e", "Session ").replace("a", " ACT ")}</Typography>
            :
            <Typography color='primary' variant='h6' >{key.replace("e", "Session ").replace("a", " ACT ")}</Typography>
            }
          </AccordionSummary>
          <AccordionDetails>
            {
              // eslint-disable-next-line no-nested-ternary
              ('error' in item)?
                <>No data Available</>
              :('wins' in item)?
                <Typography>
                  <Typography>
                    Rank : {item.final_rank_patched}
                  </Typography>
                  <Typography>
                    Total Matches : {item.number_of_games}
                  </Typography>
                  <Typography>
                    Wins Matches : {item.wins}
                  </Typography>
                  <Typography>
                    Lost Matches : {item.number_of_games - item.wins}
                  </Typography>
                </Typography>
              :
                null
            }
          </AccordionDetails>
        </Accordion>
      )
    });
  }

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={()=>props.handleClose()}
        closeAfterTransition
        className="detail-agent"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              {detailSkin.data?.name} # {detailSkin.data?.tag}
            </Typography>
            <Typography>
              Highest Rank: <b>{detailSkin.data?.highest_rank.patched_tier}</b> in <b>{detailSkin.data?.highest_rank.season.replace("e", "Session ").replace("a", " ACT ")}</b> 
            </Typography>
            {renderedData}
          </Box>
        </Fade>
      </Modal>
  );
}

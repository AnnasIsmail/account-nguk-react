import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
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
};

export default function DetailSkin(props) {
 
  const detailSkin = props.detailSkin;
  let levels = [];
  if(props.detailSkin.levels !== undefined){
    levels = props.detailSkin.levels;
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={()=>props.handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography>
              <img src={(detailSkin.displayIcon !== null)?detailSkin.displayIcon:detailSkin.chromas[0].displayIcon} alt="imageSkin" />
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {detailSkin.displayName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                  <div>
              {levels.map((data , index)=>{
                return(
                  <Accordion>
                      <AccordionSummary
                        expandIcon={<Iconify icon='ic:twotone-expand-more' width={24} height={24} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{data.displayName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Video Weapon : {(data.streamedVideo !== null)? <Link href={data.streamedVideo} target="_blank" underline="hover">{'Link Video'}</Link> : <>Not Found</>}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                );
              })}

                    
                </div>
                
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

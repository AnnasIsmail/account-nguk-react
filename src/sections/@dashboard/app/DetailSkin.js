/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import Iconify from '../../../components/Iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto'
};

export default function DetailSkin(props) {
 
  const detailSkin = props.detailSkin;
  let levels = [];
  let chromas = [];
  if(props.detailSkin.levels !== undefined){
    levels = props.detailSkin.levels;
    chromas = props.detailSkin.chromas;
  }
  const [buffer, setBuffer] = useState(false);
  
  return (
    <>
      <Modal
        className="detail-agent"
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
            <Typography sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <img style={{ maxHeight: 250 }} src={(detailSkin.displayIcon !== null)?detailSkin.displayIcon:detailSkin.chromas[0].displayIcon} alt="imageSkin" />
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {detailSkin.displayName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                  <div>
                        <Typography variant='h6'>Level</Typography>
              {levels.map((data , index)=>(
                  <Accordion>
                      <AccordionSummary
                        expandIcon={<Iconify icon='ic:twotone-expand-more' width={24} height={24} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{data.displayName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {(data.streamedVideo !== null)? 
                          <div>
                            {(buffer)&&
                              <Typography color='error' variant="h6" gutterBottom>
                                Besok ganti Provider yaaa.
                              </Typography>
                            }
                            <ReactPlayer controls url={data.streamedVideo} onBuffer={()=> setBuffer(true)} onBufferEnd={()=> setBuffer(false)} />
                          </div>
                          :
                          <>Video not found.</>
                        }
                      </AccordionDetails>
                    </Accordion>
                ))}
                        <Typography variant='h6'>Variant</Typography>

                {chromas.map((data , index)=>(
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
                          <img src={data.displayIcon} alt={data.assetPath} />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                ))}
                    
                </div>
                
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

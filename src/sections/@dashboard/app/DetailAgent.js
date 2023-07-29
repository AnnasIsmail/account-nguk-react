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
  overflow: 'auto',
};

export default function DetailAgent(props) {
  const detailSkin = props.detailSkin;
  let levels = [];
  let role = {};

  if (props.detailSkin.abilities !== undefined) {
    levels = props.detailSkin.abilities;
  }

  if (detailSkin.role !== undefined) {
    role = detailSkin.role;
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={() => props.handleClose()}
        closeAfterTransition
        className="detail-agent"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography>
              <img src={detailSkin.displayIcon} className="image-detail-agent" alt="imageSkin" />
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {detailSkin.displayName} ({role.displayName})
            </Typography>
            <Typography id="transition-modal-title" variant="p" component="p">
              " {detailSkin.description} "
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div>
                {levels.map((data, index) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<Iconify icon="ic:twotone-expand-more" width={24} height={24} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">{data.displayName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* <img src={data.displayIcon} className="image-detail-agent" alt="imageSkin" /> */}
                        <Typography>{data.description}</Typography>
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

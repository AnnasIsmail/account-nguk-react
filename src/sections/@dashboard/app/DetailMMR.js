import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import moment from 'moment';
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

export default function DetailMMR(props) {
  const detailSkin = props.detailSkin;
  let levels = [];

  if (props.detailSkin.data !== undefined) {
    levels = props.detailSkin.data;
  }
  const formattedDate = (data) => (
    <>{moment(data.date, 'dddd, MMMM D, YYYY h:mm A').add(7, 'hours').format('dddd, MMMM D, YYYY HH:mm')}</>
  );

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
            <Typography id="transition-modal-title" variant="h5" component="h2">
              {props.detailSkin.name} # {props.detailSkin.tag}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div>
                {levels.map((data, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<Iconify icon="ic:twotone-expand-more" width={24} height={24} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      {data.mmr_change_to_last_game > 1 ? (
                        <Typography variant="h6" color="primary">
                          {formattedDate(data)}
                        </Typography>
                      ) : (
                        <>
                          {data.mmr_change_to_last_game === 0 ? (
                            <Typography variant="h6">{formattedDate(data)}</Typography>
                          ) : (
                            <Typography variant="h6" color="error">
                              {formattedDate(data)}
                            </Typography>
                          )}
                        </>
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <img src={data.displayIcon} className="image-detail-agent" alt="imageSkin" /> */}
                      <Typography>
                        <Typography>Rank : {data.currenttierpatched}</Typography>
                        <Typography>MMR Match : {data.mmr_change_to_last_game}</Typography>
                        <Typography>MMR in Tier : {data.ranking_in_tier}</Typography>
                        <Typography>Elo : {data.elo}</Typography>
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

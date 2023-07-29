import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ReactJson from 'react-json-view';

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

export default function DetailLog(props) {
    let dataLog = [];

  if(props.dataLog !== undefined){
    dataLog = props.dataLog;
  }

  return (
    <>
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {dataLog.email}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            <Typography>
              <b>Activity : </b>
               {dataLog.activity}
            </Typography>
            <Typography>
            <b>Browser : </b>
              {dataLog.browser}
            </Typography>
            <Typography>
            <b>Different Time : </b>
              {dataLog.ago}
            </Typography>
            <Typography>
            <b>Actually Time : </b>
              {dataLog.created_at}
            </Typography>
            <Typography>
              <b>Identity </b>
              <ReactJson src={dataLog.identity} name={false} collapsed displayDataTypes={false} enableClipboard={false} displayObjectSize={false} />
            </Typography>
          </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

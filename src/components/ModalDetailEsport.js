import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

export default function ModalDetailEsport({ open, handleClose, data }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{   
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px' 
            }}>
            <img alt={data.name} style={{ height: '100px', width: '100px' }} src={(data)?data.icon:'https://cdn.discordapp.com/attachments/830080342026092566/1094513305256722452/images.png'} />
            <Typography id="modal-modal-title" variant="h5" component="h2">
                {data.name}
            </Typography>
        </div>
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                <b>Match Wins: </b>
                {data.game_wins}
                </div>
                <div>                
                <b>history:</b>
                </div>
                <div style={{ marginLeft: '50px' }}>
                <b>Wins: </b>
                {(data.record)?data.record.wins:0}
                </div>
                <div style={{ marginLeft: '50px' }}>
                <b>Lose: </b>
                {(data.record)?data.record.losses:0}
                </div>
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

/* eslint-disable camelcase */
// eslint-disable react/prop-types
import LoadingButton from '@mui/lab/LoadingButton';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import axiosConfig from '../../../utils/axiosConfig';

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
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

export default function EditUserManagement(props) {
    const dataUser = props.dataUser;
    const [loading, setLoading] = useState(false);

    const [nama, setNama] = useState(dataUser.nama);
    const [email, setEmail] = useState(dataUser.email);

    const [cookies, setCookie, removeCookie] = useCookies();
    const identity = useSelector((state) => state.user?.identity || undefined);
    const nameUser = useSelector((state) => state.user.nama || undefined);
    const emailUser = useSelector((state) => state.user.email || undefined);

    const submitEdit = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        setLoading(true);    

        const objectLog = {
          name: nameUser,
          email: emailUser,
          identity,
          browser:cookies.browser,
          created_at: today.toISOString()
        };

        axiosConfig.post('/access/update',{
          _id: dataUser._id,
          nama,
          email,
          token: cookies.token,
        })
        .then((response)=>{
          console.log(response);
          objectLog.activity = `Edited Access Name: ${dataUser.nama}, Email: ${email}`;
          if(response.status === 200){
            axiosConfig.post('/logs/create', objectLog)
            .then((response) =>{
              if(response.status === 200){
                  setLoading(false);
                  props.handleClose();
                  props.getData();
                }
              });
            }
        });
    }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        closeAfterTransition
        classnama="detail-agent"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
            <Box sx={style}>
                <Typography variant="h6">
                    Edit {dataUser.nama}
                </Typography>
                <TextField id="outlined-basic" label="nama" defaultValue={dataUser.nama} onChange={(e)=> setNama(e.target.value)} variant="outlined" sx={{ width: '100%' }} />
                <TextField id="outlined-basic" label="Email" defaultValue={dataUser.email} onChange={(e)=> setEmail(e.target.value)} variant="outlined" sx={{ width: '100%' }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', pt: '10px' }}>
                    <Button variant="outlined" onClick={()=>props.handleClose()}>Cancel</Button>
                    <LoadingButton variant="contained" loading={loading} onClick={submitEdit}>Submit</LoadingButton>
                </Box>
            </Box>
        </Fade>
      </Modal>
    </>
  );
}

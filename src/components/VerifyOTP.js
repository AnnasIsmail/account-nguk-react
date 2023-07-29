import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
// components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { changeEmail, changeRole, changeUser, successLogin } from '../user';
import axiosConfig from '../utils/axiosConfig';
import { FormProvider, RHFTextField } from './hook-form';

// ----------------------------------------------------------------------

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
  display: 'grid',
  gap: '15px'
};

export default function VerifyOTP(props) {
  const navigate = useNavigate();
  
  const [done , setDone] = React.useState(false);
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(props.open);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch()

  const [cookies, setCookie, removeCookie] = useCookies();
  const today = new Date();
  const nextYear = new Date();

  const [showPassword, setShowPassword] = React.useState(false);

  nextYear.setDate(today.getDate()+3600);

  const RegisterSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required'),
});

  const defaultValues = {
    otp: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const name = useSelector((state) => state.user?.nama || undefined);

  const onSubmit = async (e) => {
    setLoading(true);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const otp = e.otp;
    const objectLog = {
      otp,
      email: props.email,
      identity: cookies.identity,
      browser:cookies.browser,
      created_at: today.toISOString(),
      name
    };

    axiosConfig.post('/access/verify',{otp, email: props.email})
    .then((response) =>{
      console.log(response);
      if(response.status === 200){
        const token = response.data.data.token;
        dispatch(changeUser(response.data.data.user.nama));
        dispatch(changeRole(response.data.data.user.role));
        dispatch(changeEmail(response.data.data.user.email));
          objectLog.activity = 'Success Login with OTP';
            axiosConfig.post('/logs/create', objectLog)
            .then((response) =>{
              console.log(response);
            if(response.status === 200){
              setCookie('token', token , {expires: nextYear});
              dispatch(successLogin());
              navigate("/");
            }
        });
        }else if(response.status === 204){
              objectLog.activity = 'Failed Login wrong OTP';
              axiosConfig.post('/logs/create', objectLog)
              .then((response) =>{
                  setError(true);
                  setTextError('Wrong OTP');
                  setLoading(false);
              });
        }
    });
}

  return (
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the OTP Code
          </Typography>
          <div>
            {(error)&&
              <Typography variant="h6" gutterBottom component="div" color="error" >
                 {textError}
              </Typography>
            }
          <RHFTextField name="otp" error={error} id="outlined-basic" type="number" label="OTP" variant="outlined" />
          </div>
          <LoadingButton fullWidth type="submit" variant="contained" loading={loading}>
            Submit
          </LoadingButton>
        </Box>
    </FormProvider>
      </Modal>
  );
}

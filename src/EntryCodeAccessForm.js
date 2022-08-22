import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// @mui
import { IconButton, InputAdornment, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from './components/hook-form';
import Iconify from './components/Iconify';
// ----------------------------------------------------------------------

export default function EntryCodeAccessForm(props) {
  const navigate = useNavigate();
  
  const [done , setDone] = React.useState(false);
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [cookies, setCookie, removeCookie] = useCookies();
  const today = new Date();
  const nextYear = new Date();

  const [showPassword, setShowPassword] = React.useState(false);

  nextYear.setDate(today.getDate()+3600);

  const RegisterSchema = Yup.object().shape({
    code: Yup.string().required('Code required'),
});

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (e) => {

    const code = e.code;
    const formDataLog = new FormData();

    formDataLog.append('access_code', code);
    formDataLog.append('ip_address', cookies.myIp);
    formDataLog.append('browser', cookies.browser);


    axios(`http://127.0.0.1:8000/api/access/${code}`).then((response) =>{
        const responseName = response.data.data[0].name;
        const role = response.data.data[0].role;
        formDataLog.append('access_name', responseName);
        formDataLog.append('activity', 'Success Login');
        axios({
            url: 'http://127.0.0.1:8000/api/log/store', 
            responseType: 'json',
            method: 'post',
            data : formDataLog
          }).then((response) =>{
            setCookie('codeAccess', code , {expires: nextYear});
            setCookie('name', responseName , {expires: nextYear});
            if(role === 'admin'){
              setCookie('aStre23', '1892gdb18' , {expires: nextYear});
            }else{
              setCookie('aStre23', '18924jdbfbr' , {expires: nextYear});
            }
            document.location.reload()
        });
    }).catch((error)=> {
        formDataLog.append('access_name', 'No Detect');
        formDataLog.append('activity', 'Failed Login');
        axios({
            url: 'http://127.0.0.1:8000/api/log/store', 
            responseType: 'json',
            method: 'post',
            data : formDataLog
          }).then((response) =>{
            setError(true);
            setTextError('Access Code Is Wrong!');
            setLoading(false);
        });
    });
}

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      {(error)?
        <Typography variant="h6" gutterBottom component="div" color="error" >
          {textError}
        </Typography>
      :
      <></>
      }
      <Stack spacing={3}>

          <RHFTextField name="code" label="Access Code" type={showPassword ? 'text' : 'password'} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Submit
          </LoadingButton>
        
      </Stack>
    </FormProvider>
  );
}

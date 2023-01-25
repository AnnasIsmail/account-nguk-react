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

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const code = e.code;
    const objectLog = {
      access_code: code,
      ip_address: cookies.myIp,
      browser:cookies.browser,
      created_at: today.toISOString()
    };

    axios({
      url: 'http://localhost:5000/access/', 
      responseType: 'json',
      method: 'post',
      data : {access_code: code}
    }).then((response) =>{

        const responseName = response.data.name;
        const role = response.data.role;
        objectLog.access_name = responseName;
        objectLog.activity = 'Success Login';

        if(response.status === 200){
          axios({
            url: 'http://localhost:5000/logs/create', 
            responseType: 'json',
            method: 'post',
            data : objectLog
          }).then((response) =>{
            console.log(response)
            if(response.status === 200){
              setCookie('codeAccess', code , {expires: nextYear});
              setCookie('name', responseName , {expires: nextYear});
              if(role === 'admin'){
                setCookie('aStre23', '1892gdb18' , {expires: nextYear});
              }else{
                setCookie('aStre23', '18924jdbfbr' , {expires: nextYear});
              }
              // document.location.reload()
            }
        });
        }else if(response.status === 201){
          objectLog.access_name = 'No Detect';
              objectLog.activity = 'Failed Login';

              axios({
                  url: 'http://localhost:5000/logs/create', 
                  responseType: 'json',
                  method: 'post',
                  data : objectLog
                }).then((response) =>{
                  setError(true);
                  setTextError('Access Code Is Wrong!');
                  setLoading(false);
              });
        }
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

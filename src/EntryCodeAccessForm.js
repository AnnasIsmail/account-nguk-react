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
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from './components/hook-form';
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

    axios(`http://127.0.0.1:8000/api/access/${code}`).then((response) =>{
        setCookie('codeAccess', code , {expires: nextYear});
        document.location.reload()
    }).catch((error)=> {
      setError(true);
      setTextError('Access Code Is Wrong!');
      setLoading(false);
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

          <RHFTextField name="code" label="Access Code" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Submit
          </LoadingButton>
        
      </Stack>
    </FormProvider>
  );
}

import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
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
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axiosConfig from '../../../utils/axiosConfig';
// ----------------------------------------------------------------------

export default function AddAccessForm(props) {
  const navigate = useNavigate();
  
  const [codeField ,setCodeField] = React.useState();
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email('The data entered must be in the form of an email').required('Email required'),
});

  const defaultValues = {
    name: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const identity = useSelector((state) => state.user?.identity || undefined);
  const nameUser = useSelector((state) => state.user.nama || undefined);
  const emailUser = useSelector((state) => state.user.email || undefined);

  const onSubmit = async (e) => {
    setLoading(true);
    const {email, name} = e;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const role = 'User';

    const objectSubmit = {
      token: cookies.token,
      email,
      nama:name,
      role,
      created_at:today.toISOString(),
    }

    const objectLog = {
      name: nameUser,
      email: emailUser,
      identity,
      browser:cookies.browser,
      created_at: today.toISOString()
    };

    axiosConfig.post('/access/GiveNewAccess', objectSubmit)
    .then((response) =>{
      setLoading(false);
      setError(false);
      if(response.status === 200){
        objectLog.activity = `Created Access Name: ${name}, Email: ${email}`;
        axiosConfig.post('/logs/create', objectLog)
        .then((response) =>{
          if(response.status === 200){
            navigate('/dashboard/user-management');
          }
        });
      }else if(response.status === 204){
        setError(true);
        setTextError('You are not an Admin!');
        setLoading(false);
      }
    }).catch((error)=> {
      setError(true);
      setTextError('Add New Access Failed!');
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
        <>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Add New Access
          </LoadingButton>
        </>
      </Stack>
    </FormProvider>
  );
}

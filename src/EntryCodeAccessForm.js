import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import VerifyOTP from './components/VerifyOTP';
import { FormProvider, RHFTextField } from './components/hook-form';
import axiosConfig from './utils/axiosConfig';

// ----------------------------------------------------------------------

export default function EntryCodeAccessForm() {
  const [error, setError] = React.useState(false);
  const [textError, setTextError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [cookies] = useCookies();
  const today = new Date();
  const nextYear = new Date();
  const identity = useSelector((state) => state.user?.identity || undefined);
  nextYear.setDate(today.getDate() + 3600);
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('The data entered must be in the form of an email').required('Email is required'),
  });
  const defaultValues = {
    email: '',
  };
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async (e) => {
    setLoading(true);
    setError(false);
    setTextError('');
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const { email } = e;
    setEmail(email);
    const objectLog = {
      email,
      identity,
      browser: cookies.browser,
      created_at: today.toISOString(),
    };

    axiosConfig
      .post('/access/sendotp', { email })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          objectLog.name = 'Not Authorized';
          objectLog.activity = 'Request OTP and Email Registered.';
          axiosConfig.post('/logs/create', objectLog).then((response) => {
            if (response.status === 200) {
              setOpen(true);
            }
          });
        } else if (response.status === 204) {
          objectLog.name = 'No Detect';
          objectLog.activity = 'Request OTP and Email Unregistered.';
          axiosConfig.post('/logs/create', objectLog).then(() => {
            setError(true);
            setTextError('Email has not been registered, please contact admin!');
            setLoading(false);
          });
        }
      })
      .catch(() => {
        setError(true);
        setTextError('Server error, please try again later.');
        setLoading(false);
      });

    setTimeout(() => {
      if (loading) {
        setError(true);
        setTextError('Maap Bang API-nya masih ngantuk.');
      }
    }, 10000);

    setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
        setTextError('Yahh API-nya gamau bangun bang, coba lagi dan bang NT.');
      }
    }, 20000);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {error ? (
          <Typography variant="h6" gutterBottom component="div" color="error">
            {textError}
          </Typography>
        ) : (
          <></>
        )}
        <Stack spacing={3}>
          <RHFTextField name="email" id="outlined-basic" label="Email" variant="outlined" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Submit
          </LoadingButton>
        </Stack>
      </FormProvider>
      <VerifyOTP open={open} email={email} />
    </>
  );
}

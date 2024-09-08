import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axiosConfig from '../../../utils/axiosConfig';
import DetailAccount from './DetailAccount';

// ----------------------------------------------------------------------

export default function TrackForm() {
  const [puuid, setpuuid] = React.useState();
  const [detailAccount, setDetailAccount] = React.useState();
  const [error, setError] = React.useState(false);
  const [textError, setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [cookies] = useCookies();

  const RegisterSchema = Yup.object().shape({
    riotId: Yup.string().required('First name required'),
    tagLine: Yup.string().required('Last name required'),
  });

  const defaultValues = {
    riotId: '',
    tagLine: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (e) => {
    const { riotId, tagLine } = e;
    if (riotId && tagLine) {
      CheckAccount(riotId, tagLine);
    }
  };

  const identity = useSelector((state) => state.user?.identity || undefined);
  const email = useSelector((state) => state.user.email || undefined);
  const name = useSelector((state) => state.user.nama);

  function CheckAccount(riotId, tagline) {
    setLoading(true);
    setDetailAccount(<></>);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objectLog = {
      name,
      email,
      identity,
      browser: cookies.browser,
      created_at: today.toISOString(),
    };
    axios
      .get(`https://api.henrikdev.xyz/valorant/v1/account/${riotId.trim().replace(' ', '%20')}/${tagline}`, {Authorization: 'HDEV-546994ff-f305-4d59-a37b-fdad32b442f5'})
      .then((response) => {
        setpuuid(response.data.data.puuid);
        setLoading(false);
        setError(false);

        objectLog.activity = `Track Account Riot ID: ${riotId}, Tag Line: ${tagline}`;
        axiosConfig.post('/logs/create', objectLog);

        setDetailAccount(<DetailAccount data={response.data.data} puuid={puuid} />);
      })
      .catch(() => {
        setError(true);
        setTextError('Account Not Found');
        setLoading(false);
      });
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error ? (
        <Typography variant="h6" gutterBottom component="div" color="error">
          {textError}
        </Typography>
      ) : (
        <></>
      )}
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="form-new-account">
          <RHFTextField name="riotId" label="Riot ID" className="form-new-account-first" id="riotId" />
          <h1>#</h1>
          <RHFTextField name="tagLine" label="Tag Line" id="tagline" />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Track Account
        </LoadingButton>

        {detailAccount}
      </Stack>
    </FormProvider>
  );
}

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import axiosConfig from '../../../utils/axiosConfig';

// ----------------------------------------------------------------------
let skins = [];
let agents = [];

export default function NewAccountForm() {
  const navigate = useNavigate();
  const [skinSelect , setSkinSelect] = React.useState([]);
  const [agentSelect , setAgentSelect] = React.useState([]);
  const [showPassword, setShowPassword] = useState(true);

  const [puuid , setpuuid] = React.useState();
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();

  const [cookies, setCookie, removeCookie] = useCookies();
  const identity = useSelector((state) => state.user?.identity || undefined);
  const name = useSelector((state) => state.user.nama || undefined);
  const email = useSelector((state) => state.user.email || undefined);

  const RegisterSchema = Yup.object().shape({
    riotId: Yup.string().required('First name required'),
    tagLine: Yup.string().required('Last name required'),
    username: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
    owner: Yup.string().required('owner is required'),
});

  const defaultValues = {
    tagLine: '',
    password: '',
    owner: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objectAccount = {
      puuid, 
      username: e.username,
      password: e.password,
      owner: e.owner,
      skin:skinSelect,
      agent: agentSelect,
      created_at: today.toISOString(),
      update_at: today.toISOString(),
      update_by: email,
      delete_status: false,
      token: cookies.token
    };
    
    const objectLog = {
      name,
      email,
      identity,
      browser:cookies.browser,
      created_at: today.toISOString(),
    };
    setLoading(true);
    
    axiosConfig.post('/accounts/add', objectAccount)
    .then((response) =>{
      if(response.status === 200){
        setLoading(false);
        objectLog.activity = `Created Account Riot ID: ${e.riotId}, Tag Line: ${e.tagLine}, puuid: ${puuid},`;
        axiosConfig.post('/logs/create', objectLog)
        .then((response) =>{
          if(response.status === 200){
            navigate('/dashboard/all-account', { replace: true }) ;
          }
        });
      }
    });
  };

  const [autocompleteSkins, setAutocompleteSkins] = React.useState(
          <Autocomplete
        multiple
        id="skins"
        name="skins"
        options={noData}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Get Data"
            placeholder="Get Data"
          />
        )}
      />);

      const [autocompleteAgents, setAutocompleteAgents] = React.useState(
        <Autocomplete
      multiple
      id="agents"
      name="agents"
      options={noData}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Get Data"
          placeholder="Get Data"
        />
      )}
    />);

  React.useEffect(()=>{
    axios.get('https://valorant-api.com/v1/weapons/skins').then((response) =>{
        let data = [];
        data  = response.data.data;

        const skinsSementara = [];

        data.map(data=>{
            if(data.displayName.startsWith('Standard') !== true && data.displayName.startsWith('Random') !== true){
                return skinsSementara.push({name : data.displayName , uuid : data.uuid});
            }
            return false;
        });

        skins = skinsSementara;
        
        setAutocompleteSkins(<Autocomplete
            multiple
            id="skins"
            name="skins"
            options={skins}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setSkinSelect(value)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="List Account Skins"
                placeholder="Reaver Vandal"
              />
            )}
          />);

    });
    
    axios.get('https://valorant-api.com/v1/agents').then((response) =>{
        let data = [];
        data  = response.data.data;

        const agentsSementara = [];

        data.map(data=>{
            if(data.displayName !== 'Sova' && data.displayName !== 'Brimstone' && data.displayName !== 'Jett' && data.displayName !== 'Phoenix' && data.displayName !== 'Sage'){
                return agentsSementara.push({name : data.displayName , uuid : data.uuid});
            }
            return false;
        });

        agents = agentsSementara;
        
        setAutocompleteAgents(<Autocomplete
            multiple
            id="agents"
            name="agents"
            options={agents}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setAgentSelect(value)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="List Account Agents"
                placeholder="Killjoy"
              />
            )}
          />);
    });

  },[]);


  const checkPuuid=()=>{
    const riotId = document.getElementById('riotId').value;
    const tagline = document.getElementById('tagline').value;

    if(riotId !== '' && riotId !== undefined && tagline !== '' && tagline !== undefined){
      axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${riotId}/${tagline}`).then((response) =>{
        setpuuid(response.data.data.puuid);
        checkExistAccount(response.data.data.puuid);
      }).catch((error)=> {
        setError(true);
        setTextError('Account Not Found');
      });
    }
  }

  const checkExistAccount=(puuid)=>{
    axiosConfig.post('/accounts/exist',{puuid})
    .then((response) =>{
      if(response.status === 200){
        setError(true);
        setTextError('Account Already Registered');
      }else{
        setError(false);
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="form-new-account" >
          <RHFTextField name="riotId" label="Riot ID" className="form-new-account-first" onBlur={checkPuuid} id="riotId" />
          <h1>#</h1>
          <RHFTextField name="tagLine" label="Tag Line" onBlur={checkPuuid} id="tagline" />
        </Stack>

        <RHFTextField name="username" label="Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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

        <RHFTextField name="owner" label="Nama Pemilik" />


      {autocompleteSkins}
      {autocompleteAgents}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Add New Account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}


const noData = [
  ];
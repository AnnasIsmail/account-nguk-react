import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
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

  let lengthSkins = 0;
  let lengthAgents = 0;
  let indexSkin = 0;
  let indexAgent = 0;

  function doneSubmit(){

    if(lengthSkins === indexSkin && lengthAgents === indexAgent){
      navigate('/dashboard/all-account', { replace: true }) ;
    }
  }

  const onSubmit = async (e) => {

      const formData = new FormData(); 
  
      formData.append('puuid', puuid);
      formData.append('username', e.username);
      formData.append('password', e.password);
      formData.append('owner', e.owner);
      
      const formDataLog = new FormData();
      
      formDataLog.append('access_code', cookies.codeAccess);
      formDataLog.append('ip_address', cookies.myIp);
      formDataLog.append('browser', cookies.browser);
      formDataLog.append('access_name', cookies.name);

      axios({
        url: 'http://127.0.0.1:8000/api/account/store', 
        responseType: 'json',
        method: 'post',
        data : formData
      }).then((response)=> {
        const idAccount = response.data.data.id;
        lengthSkins = skinSelect.length-1;
        lengthAgents = agentSelect.length-1;          

        if(skinSelect.length === 0){
          lengthSkins = skinSelect.length;
        }
        
        if(agentSelect.length === 0){
        lengthAgents = agentSelect.length;          
        }

        if(skinSelect.length === 0 || agentSelect.length === 0){
            doneSubmit();
        }

        formDataLog.append('activity', `Created Account id: ${idAccount}, Riot ID: ${e.riotId}, Tag Line: ${e.tagLine}`);
        axios({
          url: 'http://127.0.0.1:8000/api/log/store', 
          responseType: 'json',
          method: 'post',
          data : formDataLog
        });

        skinSelect.map((data , index)=>{
  
          const formDataSkin = new FormData();
  
          formDataSkin.append('account_id', idAccount);
          formDataSkin.append('name', data.name);
          formDataSkin.append('uuid', data.uuid);
  
          axios({
            url: 'http://127.0.0.1:8000/api/skin/store', 
            responseType: 'json',
            method: 'post',
            data : formDataSkin
          }).then((response)=> {
              indexSkin = index;
              doneSubmit();
          }).catch((error)=> {
            console.log(error);
          });
          return true;
        });

        agentSelect.map((data , index)=>{
  
          const formDataAgent = new FormData();
  
          formDataAgent.append('account_id', idAccount);
          formDataAgent.append('name', data.name);
          formDataAgent.append('uuid', data.uuid);
  
          axios({
            url: 'http://127.0.0.1:8000/api/agent/store', 
            responseType: 'json',
            method: 'post',
            data : formDataAgent
          }).then((response)=> {
            indexAgent = index;
              doneSubmit();
          }).catch((error)=> {
            console.log(error);
          });
          
          return true;
        });
      }).catch((error)=> {
        console.log(error);
      });
      
    const myPromise = new Promise((resolve)=> {
      setTimeout(() => {  
        resolve('masuk')
      }, 100000);
    });
    
    await myPromise;

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
            if(data.displayName.startsWith('Standard') !== true){
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
      axios.get(`http://127.0.0.1:8000/api/account/puuid/${puuid}`).then((response) =>{
        console.log(response.data.data)
        if(response.data.data.length === 0){
          setError(false);
        }else{
          setError(true);
          setTextError('Account Already Registered');
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

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Add New Account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}


const noData = [
  ];
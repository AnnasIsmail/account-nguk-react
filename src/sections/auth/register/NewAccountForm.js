import React, { useState } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);


  function changeSelect(value){
    console.log(value)
    // skinSelect = value
  }

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

  const onSubmit = async (e) => {

    const formData = new FormData();

    formData.append('riotId', e.riotId);
    formData.append('tagLine', e.tagLine);
    formData.append('slug', 'asd');
    formData.append('username', e.username);
    formData.append('password', e.password);
    formData.append('owner', e.owner);

    axios({
      url: 'http://127.0.0.1:8000/api/account/store', 
      responseType: 'json',
      method: 'post',
      data : formData
    }).then((response)=> {
      console.log(response.data.data.id)
      const idAccount = response.data.data.id;

      skinSelect.map((data)=>{

        const formDataSkin = new FormData();

        formDataSkin.append('account_id', idAccount);
        formDataSkin.append('name', data.name);
        formDataSkin.append('uuid', data.uuid);

        axios({
          url: 'http://127.0.0.1:8000/api/account/skin/store', 
          responseType: 'json',
          method: 'post',
          data : formDataSkin
        }).then((response)=> {
            navigate('/dashboard/all-account', { replace: true });
        }).catch((error)=> {
          console.log(error);
        });
        
      return false;

      });
      
      agentSelect.map((data)=>{

        const formDataAgent = new FormData();

        formDataAgent.append('account_id', idAccount);
        formDataAgent.append('name', data.name);
        formDataAgent.append('uuid', data.uuid);

        axios({
          url: 'http://127.0.0.1:8000/api/account/agent/store', 
          responseType: 'json',
          method: 'post',
          data : formDataAgent
        }).then((response)=> {
            navigate('/dashboard/all-account', { replace: true });
        }).catch((error)=> {
          console.log(error);
        });
        
      return false;

      });

        // navigate('/dashboard/all-account', { replace: true });
    }).catch((error)=> {
      console.log(error);
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="form-new-account" >
          <RHFTextField name="riotId" label="Riot ID" className="form-new-account-first"  />
          <h1>#</h1>
          <RHFTextField name="tagLine" label="Tag Line" />
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
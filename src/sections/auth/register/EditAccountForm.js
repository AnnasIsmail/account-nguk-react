import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import AutoCompleteAgents from './AutoCompleteAgents';
import AutoCompleteSkins from './AutoCompleteSkins';

// ----------------------------------------------------------------------
let skins = [];
let agents = [];

export default function EditAccountForm(props) {
  const navigate = useNavigate();
  const [skinSelect , setSkinSelect] = React.useState([]);
  const [agentSelect , setAgentSelect] = React.useState([]);
  const dataAccount = props.dataAccount;
  const { slug } = useParams();
  const [showPassword, setShowPassword] = React.useState(true);

  const [cookies, setCookie, removeCookie] = useCookies();

  const RegisterSchema = Yup.object().shape({
    riotId:  Yup.string(),
    tagLine:  Yup.string(),
    username: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
    owner: Yup.string().required('owner is required'),
});

  const [riotId , setRiotId] = React.useState([]);
  const [tagLine , setTagLine] = React.useState([]);

    const defaultValues = {
      riotId:  '',
      tagLine:  '',
      username:  dataAccount.username,
      password:  dataAccount.password,
      owner:  dataAccount.owner,
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

    formData.append('puuid', dataAccount.puuid);
    formData.append('username', e.username);
    formData.append('password', e.password);
    formData.append('owner', e.owner);

    const formDataLog = new FormData();
      
    formDataLog.append('access_code', cookies.codeAccess);
    formDataLog.append('ip_address', cookies.myIp);
    formDataLog.append('browser', cookies.browser);
    formDataLog.append('access_name', cookies.name);

    axios({
      url: `http://127.0.0.1:8000/api/account/update/${slug}`, 
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

      formDataLog.append('activity', `Edited Account id: ${idAccount}, Riot ID: ${riotId}, Tag Line: ${tagLine}`);
      axios({
        url: 'http://127.0.0.1:8000/api/log/store', 
        responseType: 'json',
        method: 'post',
        data : formDataLog
      });

      axios({
        url: `http://127.0.0.1:8000/api/skin/delete/${slug}`, 
        responseType: 'json',
        method: 'post',
      }).then((response)=>{
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
      });

      axios({
        url: `http://127.0.0.1:8000/api/agent/delete/${slug}`, 
        responseType: 'json',
        method: 'post',
      }).then(()=>{

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

      });      
      
    }).catch((error)=> {
      console.log(error);
    });
    
  };

  const [autocompleteSkins, setAutocompleteSkins] = React.useState();
  const [autocompleteAgents, setAutocompleteAgents] = React.useState();

  const SetSkin =(value)=>{
    setSkinSelect(value);
  }

  const SetAgent =(value)=> {
    setAgentSelect(value);
  }

  React.useEffect(()=>{

    function getRiotIdAndTagLine(){
      axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${dataAccount.puuid}`).then((response) =>{
          setRiotId(response.data.data.name);
          setTagLine(response.data.data.tag);
      });
    }

    getRiotIdAndTagLine();

    function getDataAccountSkins(){
      axios.get(`http://127.0.0.1:8000/api/skin/${slug}`).then((response) =>{
        setSkinSelect(response.data.data);
        setAutocompleteSkins(<AutoCompleteSkins SetSkin={SetSkin} listSkins={skins} data={response.data.data} />);
      });
      
    }

    function getDataAccountAgents(){
      axios.get(`http://127.0.0.1:8000/api/agent/${slug}`).then((response) =>{
        setAgentSelect(response.data.data);
        setAutocompleteAgents( <AutoCompleteAgents SetAgent={SetAgent} listAgents={agents} data={response.data.data} /> );
      });
      
    }

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
        getDataAccountSkins();
        
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
        
        getDataAccountAgents();

    });



  },[]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="form-new-account" >
          <RHFTextField name="riotId" label="Riot ID" className="form-new-account-first" value={riotId} disabled />
          <h1>#</h1>
          <RHFTextField name="tagLine" label="Tag Line" value={tagLine} disabled />
        </Stack>

        <RHFTextField name="username" label="Username"  />

        <RHFTextField
          name="password"
          label="New Password"
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

        <RHFTextField name="owner" label="Nama Pemilik"  />


      {autocompleteSkins}
      {autocompleteAgents}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Submit Editing Account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}


const noData = [];
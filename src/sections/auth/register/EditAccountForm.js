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


  const onSubmit = async (e) => {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objectAccount = {
      _id: slug,
      username: e.username,
      password: e.password,
      owner: e.owner,
      skin:skinSelect,
      agent: agentSelect,
      update_at: today.toISOString(),
      update_by: cookies.codeAccess,
      delete_status: false
    };
    const objectLog = {
      access_code: cookies.codeAccess,
      access_name: cookies.name,
      ip_address: cookies.myIp,
      browser:cookies.browser,
      created_at: today.toISOString(),
      activity: `Edited Account id: ${slug}, Riot ID: ${riotId}, Tag Line: ${tagLine}`
    };

  
    axios({
      url: 'http://localhost:5000/accounts/update', 
      responseType: 'json',
      method: 'post',
      data : objectAccount
    }).then((response) =>{

      if(response.status === 200){
        axios({
          url: 'http://localhost:5000/logs/create', 
          responseType: 'json',
          method: 'post',
          data : objectLog
        }).then((response) =>{
          navigate('/dashboard/all-account', { replace: true }) ;
        });
      }

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
        setSkinSelect(dataAccount.skin);
        setAutocompleteSkins(<AutoCompleteSkins SetSkin={SetSkin} listSkins={skins} data={dataAccount.skin} />);
    }

    function getDataAccountAgents(){
        setAgentSelect(dataAccount.agent);
        setAutocompleteAgents( <AutoCompleteAgents SetAgent={SetAgent} listAgents={agents} data={dataAccount.agent} /> );
    }

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
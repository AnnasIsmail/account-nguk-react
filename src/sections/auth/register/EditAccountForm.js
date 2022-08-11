import React from 'react';
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

export default function EditAccountForm() {
  const navigate = useNavigate();
  const [skinSelect , setSkinSelect] = React.useState([]);
  const [agentSelect , setAgentSelect] = React.useState([]);
  const [dataAccount , setDataAccount] = React.useState([]);
  const { slug } = useParams();

  const [showPassword, setShowPassword] = React.useState(false);


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

const [riotId, setRiotId] = React.useState('');
const [tagLine, setTagLine] = React.useState('');
const [username, setUsername] = React.useState('');
const [pemilik, setPemilik] = React.useState('');

    const defaultValues = {
      riotId:  '',
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
          url: 'http://127.0.0.1:8000/api/skin/store', 
          responseType: 'json',
          method: 'post',
          data : formDataSkin
        }).then((response)=> {
          return console.log(response)
            // navigate('/dashboard/all-account', { replace: true });
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
          url: 'http://127.0.0.1:8000/api/agent/store', 
          responseType: 'json',
          method: 'post',
          data : formDataAgent
        }).then((response)=> {
          return console.log(response)
            // navigate('/dashboard/all-account', { replace: true });
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

  const [autocompleteSkins, setAutocompleteSkins] = React.useState();
  const [autocompleteAgents, setAutocompleteAgents] = React.useState();

  React.useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/account/${slug}`).then((response) =>{
      setDataAccount(response.data.data);

      response.data.data.forEach(data=>{
        setRiotId(data.riotId);
        setTagLine(data.tagLine);
        setUsername(data.username);
        setPemilik(data.owner);
      });
    });

    function getDataAccountSkins(){
      axios.get(`http://127.0.0.1:8000/api/skin/${slug}`).then((response) =>{
        setAutocompleteSkins(<AutoCompleteSkins listSkins={skins} data={response.data.data} />);
      });
      
    }

    function getDataAccountAgents(){
      console.log(agents)
      axios.get(`http://127.0.0.1:8000/api/agent/${slug}`).then((response) =>{
        setAutocompleteAgents( <AutoCompleteAgents listAgents={agents} data={response.data.data} /> );
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
          <RHFTextField value={riotId} name="riotId" label="Riot ID" className="form-new-account-first"  />
          <h1>#</h1>
          <RHFTextField value={tagLine} name="tagLine" label="Tag Line"  />
        </Stack>

        <RHFTextField value={username} name="username" label="Username"  />

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

        <RHFTextField value={pemilik} name="owner" label="Nama Pemilik"  />


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
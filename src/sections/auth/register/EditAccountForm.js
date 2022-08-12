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

export default function EditAccountForm(props) {
  const navigate = useNavigate();
  const [skinSelect , setSkinSelect] = React.useState([]);
  const [agentSelect , setAgentSelect] = React.useState([]);
  const dataAccount = props.dataAccount;
  const { slug } = useParams();
  const [showPassword, setShowPassword] = React.useState(true);

  const RegisterSchema = Yup.object().shape({
    riotId: Yup.string().required('First name required'),
    tagLine: Yup.string().required('Last name required'),
    username: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required'),
    owner: Yup.string().required('owner is required'),
});


    const defaultValues = {
      riotId:  dataAccount.riotId,
      tagLine:  dataAccount.tagLine,
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

    const formData = new FormData();

    formData.append('riotId', e.riotId);
    formData.append('tagLine', e.tagLine);
    formData.append('slug', 'asd');
    formData.append('username', e.username);
    formData.append('password', e.password);
    formData.append('owner', e.owner);


    axios({
      url: `http://127.0.0.1:8000/api/account/update/${slug}`, 
      responseType: 'json',
      method: 'post',
      data : formData
    }).then((response)=> {
      console.log(response.data.data.id)
      const idAccount = response.data.data.id;

      axios({
        url: `http://127.0.0.1:8000/api/skin/delete/${slug}`, 
        responseType: 'json',
        method: 'post',
      }).then(()=>{

        skinSelect.foreach((data)=>{

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
          
        });

      });

      axios({
        url: `http://127.0.0.1:8000/api/agent/delete/${slug}`, 
        responseType: 'json',
        method: 'post',
      }).then(()=>{

        agentSelect.foreach((data)=>{

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
        });

      });      
      
    }).then(()=>{
        navigate('/dashboard/all-account', { replace: true });

    }).catch((error)=> {
      console.log(error);
    });
    
    

  };

  const [autocompleteSkins, setAutocompleteSkins] = React.useState();
  const [autocompleteAgents, setAutocompleteAgents] = React.useState();

  React.useEffect(()=>{
    // axios.get(`http://127.0.0.1:8000/api/account/${slug}`).then((response) =>{
    //   setDataAccount(response.data.data);

    //   response.data.data.forEach(data=>{
    //     setRiotId(data.riotId);
    //     setTagLine(data.tagLine);
    //     setUsername(data.username);
    //     setPemilik(data.owner);
    //   });
    // });

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
          <RHFTextField name="riotId" label="Riot ID" className="form-new-account-first"  />
          <h1>#</h1>
          <RHFTextField name="tagLine" label="Tag Line"  />
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


const noData = [
  ];
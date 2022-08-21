import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

export default function AddAccessForm(props) {
  const navigate = useNavigate();
  
  const [code , setCode] = React.useState();
  const [done , setDone] = React.useState(false);
  const [codeField ,setCodeField] = React.useState();
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
});

  const defaultValues = {
    name: '',
    accessCode: '',
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

    const name = e.name;

    const d = new Date();
    const time = d.getTime().toString().slice(9);
    const nameDanTime = `${name}${time}`;
    
    const formDataAgent = new FormData();
  
    formDataAgent.append('access_code', nameDanTime);
    formDataAgent.append('name', name);
    formDataAgent.append('role', 'User');

    axios({
      url: 'http://127.0.0.1:8000/api/access/store', 
      responseType: 'json',
      method: 'post',
      data : formDataAgent
    }).then((response) =>{
      setDone(true);
      setCodeField(
        <RHFTextField name="accessCode" label="Access Code" className="form-new-account-first"id="accessCode" value={nameDanTime} disabled />
      );
      setCode(name);
      setLoading(false);
      setError(false);
    }).catch((error)=> {
      setError(true);
      setTextError('Add New Access Failed!');
      setLoading(false);
    });
}

const copy =(message, text)=>{
  props.copyProps(message);
  navigator.clipboard.writeText(text);
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
        

        {(done)?
        <>
          <RHFTextField name="name" label="Name" disabled />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="form-new-account" >
            {codeField}
            <Button color='primary' onClick={()=>copy('Password', 'string')} >
              <Iconify icon='fluent:copy-16-filled' width={24} height={24} />
            </Button>
          </Stack>
          <Button fullWidth size="large"  variant="contained" onClick={()=>document.location.reload()}>
            Add Again
          </Button>
        </>
        :
        <>
          <RHFTextField name="name" label="Name" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Add New Access
          </LoadingButton>
        </>
      }


        
      </Stack>
    </FormProvider>
  );
}

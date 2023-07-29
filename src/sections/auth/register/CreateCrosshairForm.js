import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axiosConfig from '../../../utils/axiosConfig';
// ----------------------------------------------------------------------


export default function CreateCrosshairForm(props) {
  const navigate = useNavigate();
  
  const [codeField ,setCodeField] = React.useState();
  const [error , setError] = React.useState(false);
  const [textError , setTextError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [src, setSrc] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [codeFilled, setCodeFilled] = React.useState(false);
  const [loadingPreview, setLoadingPreview] = React.useState(true);  
  const [cookies, setCookie, removeCookie] = useCookies();


  const arrayBackground = [
      'https://www.vcrdb.net/img/bgs/default.webp',
      'https://www.vcrdb.net/img/bgs/green.webp' , 
      'https://www.vcrdb.net/img/bgs/metall.webp', 
      'https://www.vcrdb.net/img/bgs/blaugelb.webp', 
      'https://www.vcrdb.net/img/bgs/yellow.webp',
      'https://www.vcrdb.net/img/bgs/orange.webp',
      'https://www.vcrdb.net/img/bgs/blue.webp',
      'https://www.vcrdb.net/img/bgs/grass.webp',
      'https://www.vcrdb.net/img/bgs/sky.webp'
  ]


  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    code: Yup.string().required('Code Crosshair required'),
});

  const defaultValues = {
    name: '',
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const author = useSelector((state) => state.user.nama);
  const identity = useSelector((state) => state.user?.identity || undefined);
  const email = useSelector((state) => state.user.email || undefined);

  const onSubmit = async (e) => {
    setLoading(true);
    const {code, name} = e;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const objectSubmit = {
      code,
      name,
      author,
      created_at:today.toISOString(),
      token: cookies.token
    }

    const objectLog = {
      name: author,
      email,
      identity,
      browser:cookies.browser,
      created_at: today.toISOString(),
    };

    axiosConfig.post('/crosshair/create',objectSubmit)
    .then((response) =>{
      setLoading(false);
      setError(false);
      if(response.status === 200){
        objectLog.activity = `Created Crosshair Name: ${name}, Code: ${code}`;
        axiosConfig.post('/logs/create', objectLog)
        .then((response) =>{
          if(response.status === 200){
            navigate('/dashboard/crosshair');
          }
        });
      }
    }).catch((error)=> {
      setError(true);
      setTextError('Add New Crosshair Failed!');
      setLoading(false);
    });
}

const checkCrosshair = (code) => {
    console.log(code.target.value)
    if(code.target.value === "") return false;
    setCodeFilled(true);
    setLoadingPreview(true);
    try {
        fetch(`https://api.henrikdev.xyz/valorant/v1/crosshair/generate?id=${code.target.value}`)
        .then(response => response.blob())
        .then((blob)=>{
            console.log(blob)
            const url = URL.createObjectURL(blob)
            setSrc(url);
            setLoadingPreview(false);
        });
    } catch (error) {
        setError(true);
        setTextError('Code of Crosshair is Error, Please check your Code again!');
        setLoading(false);
    }
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
        <>
          <RHFTextField name="name" label="Name Crosshair" />
          <RHFTextField onBlur={checkCrosshair} name="code" label="Code Crosshair" />
            {(codeFilled)&&
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Preview Crosshair
                    </Typography>
                    {(loadingPreview)?
                        <>
                            <Skeleton variant="rectangular" sx={{  width: '128px', height: '128px', borderRadius: '10px', mt: '10px' }} style={{ marginTop: 0 }} />
                        </>
                    :
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={arrayBackground[index]} alt='background' style={{ height: '128px', width: '128px', borderRadius: '10px' }} />
                            <img src={src} alt='crosshair' style={{ height: '128px', width: '128px', position: 'absolute', zIndex: 100, marginTop: '-44px' }} />
                            <Button sx={{ mt: '10px' }} onClick={()=> setIndex((index < arrayBackground.length-1)?index+1:0)}>Change Background</Button>
                        </div>
                    }
                </div>
            }
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Add New Crosshair
          </LoadingButton>
        </>
      </Stack>
    </FormProvider>
  );
}

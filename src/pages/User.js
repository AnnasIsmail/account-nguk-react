// material
import { Container, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// components
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import DetailLog from '../sections/@dashboard/app/DetailLog';
import axiosConfig from '../utils/axiosConfig';
// mock

// ----------------------------------------------------------------------

export default function User() {

  const [pageSize, setPageSize] = React.useState(10);
  const [loading , setLoading] = React.useState(false);

  const [openDetailMMR, setOpenDetailMMR] = React.useState(false);
  const [detailMMR,setDetailMMR] = React.useState([]);
  const handleCloseDetailMMR = () => setOpenDetailMMR(false);

  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.role);

  if(isAdmin !== 'admin'){
    navigate("/404", { replace: true });
  }
  const [rows, setRows] = React.useState([]);

  React.useEffect(()=>{
    setOpenDetailMMR(false);
    getData();
  },[]);
  
  const getData = () => {
    setLoading(false);
    axiosConfig.post('/logs/', {token: cookies.token})
    .then((response) =>{
    console.log(response);
    const temporaryRows = []
      const wait = new Promise((res , rej)=>{
        response.data.reverse().forEach((data , index)=>{
          const temporaryObject = data;
          temporaryObject.id = index+1;
          temporaryObject.ago = moment(data.created_at).fromNow();
          temporaryObject.created_at = moment(data.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
          temporaryRows.push(temporaryObject);
          if(index === response.data.length-1) res();
        });
      })
  
      wait.then(()=>{
        setRows(temporaryRows);        
        setLoading(true);
      });
    });
  }

  const openDetailLog=(e)=> {
    setDetailMMR(e.row);
    setOpenDetailMMR(true);
  }

  return (
      <Page title="Logs Users" >
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h4" gutterBottom component="div">
                    Logs
                </Typography>
                <Button variant="contained" onClick={getData} startIcon={<Iconify icon="material-symbols:refresh" />}>
                    Refresh
                </Button>
            </Stack>
          <Container >
          {(loading)?
            <div style={{ height: '75vh', width: '100%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  onRowClick={openDetailLog}
                  pagination
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                />
              </div>
          :
            <Skeleton variant="rectangular" style={{ height: '75vh', width: '100%', borderRadius: 10 }} />
          }
          
          </Container>
          <DetailLog open={openDetailMMR} handleClose={handleCloseDetailMMR} dataLog={detailMMR} />
      </Container>
    </Page>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 150, editable: false },
  { field: 'email', headerName: 'Email', width: 250, editable: false },
  { field: 'activity', headerName: 'Activity',width:250 , editable: false },
  { field: 'ago',headerName: 'Ago',width: 120,editable: false},
  { field: 'created_at',headerName: 'Create At',width: 280,editable: false},
];

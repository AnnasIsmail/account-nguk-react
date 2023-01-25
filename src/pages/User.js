// material
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
// components
import Page from '../components/Page';
import DetailLog from '../sections/@dashboard/app/DetailLog';
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

  
  if(cookies.aStre23 !== '1892gdb18'){
    navigate("/404", { replace: true });
  }

  React.useEffect(()=>{
    axios.get('http://localhost:5000/logs/').then((response) =>{
      const temporaryRows = []
      const wait = new Promise((res , rej)=>{
        response.data.forEach((data , index)=>{
          const temporaryObject = data;
          temporaryObject.id = index+1;
          temporaryObject.ago = moment(data.created_at).fromNow();
          temporaryObject.created_at = moment(data.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
          temporaryRows.push(temporaryObject);
          if(index === response.data.length-1) res();
        });
      })

      wait.then(()=>{
        rows = temporaryRows;        
        setLoading(true);
      });
    });
  },[]);

  const openDetailLog=(e)=> {
    setDetailMMR(e.row);
    setOpenDetailMMR(true);
  }

  return (
    <Page title="Logs Users" >
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

    </Page>
  );
}

const columns = [
  { field: 'access_name', headerName: 'Name', width: 150, editable: false },
  { field: 'access_code', headerName: 'Access Code', width: 150, editable: false, hide: true },
  { field: 'activity', headerName: 'Activity',width:250 , editable: false },
  { field: 'ip_address',headerName: 'Ip Address',width: 130,editable: false,},
  { field: 'browser',headerName: 'Browser',width: 140,editable: false,},
  { field: 'ago',headerName: 'Ago',width: 120,editable: false},
  { field: 'created_at',headerName: 'Create At',width: 280,editable: false},
];

let rows = [];
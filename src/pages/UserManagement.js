// eslint-disable-next-line import/no-unresolved
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AlertDelete from '../components/AlertDelete';
import Page from '../components/Page';
import EditUserManagement from '../sections/@dashboard/app/EditUserManagement';
import axiosConfig from '../utils/axiosConfig';

// let rows = []

export default function UserManagement() {

    const navigate = useNavigate();
    const isAdmin = useSelector((state) => state.user.role);
    if(isAdmin !== 'admin'){
      navigate("/404", { replace: true });
    }

    const columns = [
        { field: 'nama', headerName: 'Name', width: 100, },
        { field: 'email', headerName: 'Email', width: 280 , },
        {
          field: 'created_at',
          headerName: 'Date Created',
          type: 'date',
          width: 280,
        },
        {
          field: 'lastLogin',
          headerName: 'Last Login',
          type: 'dateTime',
          width: 220,
        },
        {
          field: 'role',
          headerName: 'Role',
          type: 'dateTime',
          width: 120,
        },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          width: 100,
          disableClickEventBubbling: true,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              // eslint-disable-next-line no-undef
              onClick={() => handleDelete(params)}
            >
              Delete
            </Button>
          ),
        },
      ];

const [cookies, setCookie, removeCookie] = useCookies();
const [rows, setRows] = useState([]);
const [openEdit, setOpenEdit] = useState(false);
const [dataUserEdit, setDataUserEdit] = useState({});

const handleDoubleClick =(e)=>{
    setDataUserEdit(e.row)
    setOpenEdit(true);
    // setOpenEdit()
}

useEffect(()=>{
    getData();
},[]);


const getData = () => {

    const arrayPush = [];

    axiosConfig.post('/access',{token: cookies.token})
    .then((response)=>{
        response.data.forEach((data , index)=>{
            data.id = index+1;
            data.created_at = moment(data.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
            data.lastLogin = moment(data.lastLogin).fromNow();

            if(!data.delete_status){
                arrayPush.push(data);
            }
            
            if(index === response.data.length-1){
                setRows(arrayPush);
            }
        })
    });
}

const [openDelete, setOpenDelete] = useState(false);
const [dataUserDelete, setDataUserDelete] = useState({});
const handleDelete = (e) => {
    setDataUserDelete(e.row);
    setOpenDelete(true);
}

const identity = useSelector((state) => state.user?.identity || undefined);
const nameUser = useSelector((state) => state.user?.nama || undefined);
const emailUser = useSelector((state) => state.user?.email || undefined);

const deleteAccess = (e) => {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const objectLog = {
    name: nameUser,
    email: emailUser,
    identity,
    browser:cookies.browser,
    created_at: today.toISOString()
  };

  axiosConfig.post('/access/delete',{_id: dataUserDelete._id, token: cookies.token})
  .then((response)=>{
    console.log(response);
    objectLog.activity = `Deleted Access Name: ${dataUserDelete.nama}, Email: ${dataUserDelete.email}`;
    if(response.status === 200){
      axiosConfig.post('/logs/create', objectLog)
      .then((response) =>{
        if(response.status === 200){
          setOpenDelete(false);
          getData();
        }
      });
    }
  });
}

return (
    <Page title="User Management" style={{ height: '100%', width: 'calc(100% - 20px)', margin:'0 10px' }}>
      {/* <div style={{ height: '100%', width: '100%' }}> */}
        <DataGrid rows={rows} columns={columns} onRowDoubleClick={handleDoubleClick}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
              },
          }}
        />
        <EditUserManagement getData={getData} open={openEdit} handleClose={()=> setOpenEdit(false)} dataUser={dataUserEdit} />
        <AlertDelete open={openDelete} actionDelete={deleteAccess} handleClose={()=> setOpenDelete(false)} nama={dataUserDelete.nama} message={`Apakah kamu yakin ingin menghapus akses `} />
      {/* </div> */}
  </Page>
  );
  
}



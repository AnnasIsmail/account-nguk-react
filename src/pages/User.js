// material
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
// components
import Page from '../components/Page';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'activity', label: 'Activity', alignRight: false },
  { id: 'ipAddress', label: 'Ip Address', alignRight: false },
  { id: 'browser', label: 'Browser', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: '' },
];

export default function User() {

  const [pageSize, setPageSize] = React.useState(5);

  return (
    <Page title="Logs Users" >
      <Container >
      <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid
              rows={rows}
              columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </div>
      
      </Container>
    </Page>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: false },
  { field: 'age', headerName: 'Age', type: 'number', editable: false },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: false,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },  {
    id: 1,
    name: 'annas',
    age: 26,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
    {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
    {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },

  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },

  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },

  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },

  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
  {
    id: 1,
    name: 'annas',
    age: 25,
    dateCreated: 'sadad',
    lastLogin: 'asdsad',
  },
];
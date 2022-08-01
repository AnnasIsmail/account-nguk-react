import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/SignIn';
import Register from './pages/SignUp';

function App() {
  const [angka, setAngka] = React.useState();

  React.useEffect(()=>{
    
      axios.get('http://127.0.0.1:8000/api/coba').then(function (response) {
        console.log(response.data)
      });

    },[])

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Redirect from="*" to="/" /> */}
      </Routes>
    </>
  );
}

export default App;

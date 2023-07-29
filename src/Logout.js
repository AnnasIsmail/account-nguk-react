import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from './user';

export default function Logout(){
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    removeCookie('token', { path: '/' });
    removeCookie('token', { path: '/dashboard' });
    removeCookie('token', { path: '/account' });
    removeCookie('token', { path: '/crosshair' });
    dispatch(logout());
    React.useEffect(()=>{
        navigate("/");
    });
    
    return(
    <>
        Log Out
    </>
    )
}
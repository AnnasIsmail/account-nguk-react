import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    removeCookie('codeAccess' , {path: '/'});
    removeCookie('name' , {path: '/'});
    removeCookie('aStre23' , {path: '/'});

    removeCookie('codeAccess' , {path: '/dashboard'});
    removeCookie('name',  {path: '/dashboard'});
    removeCookie('aStre23' , {path: '/dashboard'});

    document.location.reload();
    navigate("/", { replace: true });
    
    return(
    <>
        Log Out
    </>
    )
}
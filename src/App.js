import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
// routes
import Router from './routes';
import { changeEmail, changeIdentity, changeRole, changeUser, successLogin } from './user';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import EntryCodeAccess from './EntryCodeAccess';
import axiosConfig from './utils/axiosConfig';

// ----------------------------------------------------------------------

function App() {

  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch()
  const {token} = cookies;
  const login = useSelector((state) => state.user.login);
  const [isLoading , setIsLoading] = React.useState(true);

  const today = new Date();
  const nextYear = new Date();
  nextYear.setDate(today.getDate()+18000);

  if(cookies.browser === undefined){
    const userAgent = navigator.userAgent;
    let browserName;
    
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
      }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if(userAgent.match(/edg/i)){
        browserName = "edge";
      }else{
        browserName="No browser detection";
      }
    
     setCookie('browser', browserName , {expires: nextYear});         
  }

  function checkToken(response, today) {
    axiosConfig.post('/access/checkToken', {
      token, identity: response.data, browser: cookies.browser, created_at: today.toISOString()
    })
    .then((response) =>{
      console.log(response);
      if(response.status === 204){
        // removeCookie('token' , {path: '/'});
        // removeCookie('token', { path: '/dashboard' });
        // window.location.reload();
        return false;
      }
      setIsLoading(false);
      dispatch(changeUser(response.data.data.nama));
      dispatch(changeRole(response.data.data.role));
      dispatch(changeEmail(response.data.data.email));
      dispatch(successLogin());
    });
  }

  React.useEffect(()=>{

    try {
      axios('https://ipapi.co/json/').then((response) =>{
        dispatch(changeIdentity(response.data));
        if(token !== undefined){
          const timeElapsed = Date.now();
          const today = new Date(timeElapsed);
          try {
            checkToken(response, today);
          } catch (error) {
            checkToken(response, today);
          }
        }else{
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }

  },[]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {(login)?
        <Router />
      :
        <EntryCodeAccess isLoading={isLoading} />
      }
    </ThemeProvider>
  );
}

export default App;
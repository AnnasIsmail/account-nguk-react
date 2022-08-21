import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import EntryCodeAccess from './EntryCodeAccess';

// ----------------------------------------------------------------------

function App() {

  const [login , setLogin] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const code = cookies.codeAccess;

  const today = new Date();
  const nextYear = new Date();
  nextYear.setDate(today.getDate()+18000);

  if(cookies.myIP === undefined){
    axios(`https://api.ipify.org`).then((response) =>{
      setCookie('myIp' , response.data , {expires: nextYear});
    })
  }

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

  React.useEffect(()=>{
    axios(`http://127.0.0.1:8000/api/access/${code}`).then((response) =>{
        setLogin(true);
  }).catch((error)=> {
    removeCookie('codeAccess');
  });
  },[]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {(login)?
        <Router />
      :
        <EntryCodeAccess />
      }
    </ThemeProvider>
  );
}

export default App;
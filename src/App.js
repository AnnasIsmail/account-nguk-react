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

  const [cookies, setCookie, removeCookie] = useCookies();
  const code = cookies.codeAccess;
  const [login , setLogin] = React.useState(false);

  if(code !== undefined && login === false){
    setLogin(true);
  }

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
    if(code !== undefined){
      try {
        axios({
          url: 'http://localhost:5000/access/', 
          responseType: 'json',
          method: 'post',
          data : {access_code: code}
        }).then((response) =>{
          setLogin(true);
        }).catch((error)=> {
          removeCookie('codeAccess' , {path: '/'});
          removeCookie('name' , {path: '/'});
          removeCookie('aStre23' , {path: '/'});
      
          removeCookie('codeAccess' , {path: '/dashboard'});
          removeCookie('name',  {path: '/dashboard'});
          removeCookie('aStre23' , {path: '/dashboard'});
          document.location.reload();
        });
      } catch (error) {
        removeCookie('codeAccess' , {path: '/'});
        removeCookie('name' , {path: '/'});
        removeCookie('aStre23' , {path: '/'});
    
        removeCookie('codeAccess' , {path: '/dashboard'});
        removeCookie('name',  {path: '/dashboard'});
        removeCookie('aStre23' , {path: '/dashboard'});
        document.location.reload();
      }
    }
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
import PropTypes from 'prop-types';
// material
import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useCookies } from 'react-cookie';
//
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';


// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

const themeOptions ={
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
  palette
}

const themeDark = {
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
  palette: {mode: 'dark'}
};

const useDarkMode = (themeCookie) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [theme, setTheme] = React.useState((cookies.theme === 'light' || cookies.theme === undefined)? themeOptions : themeDark);

  const today = new Date();
  const nextYear = new Date();
  nextYear.setDate(today.getDate()+3600);

  const toggleDarkMode = () => {
    let toTheme = '';
    if (cookies.theme === 'light' || cookies.theme === undefined) {
      setCookie('theme' , 'dark' , {expires: nextYear});
      toTheme = 'dark';
    } else {
      setCookie('theme' , 'light' , {expires: nextYear});
      toTheme = 'light';
    }

    changeTheme(toTheme);
  };

  const changeTheme = (toTheme) => {
    if (toTheme === 'light' || toTheme === undefined) {
      setTheme(themeOptions);
    } else {
      setTheme(themeDark);
    }

  };

  return [theme, toggleDarkMode];
};

export default function ThemeProvider({ children }) {

  const [cookies, setCookie, removeCookie] = useCookies();

  const themeCookie = cookies.theme;
  
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createTheme(theme);

  themeConfig.components = componentsOverride(themeConfig);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={themeConfig}>
        <CssBaseline />
        {children}
        <input hidden id="theme" onClick={toggleDarkMode} />
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

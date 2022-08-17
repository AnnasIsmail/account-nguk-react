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

let themeSwitch = 'light';

const useDarkMode = (themeCookie) => {
  const [theme, setTheme] = React.useState((themeSwitch === 'light')? themeOptions : themeDark);
  
  const toggleDarkMode = () => {

    if (themeCookie === 'light') {
      themeCookie = 'dark';
    } else {
      themeCookie = 'light';
    }

    changeTheme();
  };

  const changeTheme = () => {

    if (themeCookie === 'light' || themeCookie === undefined) {
      setTheme(themeOptions);
    } else {
      setTheme(themeDark);
    }
  };

  return [theme, toggleDarkMode];
};

export default function ThemeProvider({ children }) {

  const [cookies, setCookie, removeCookie] = useCookies(['theme']);

  const themeCookie = cookies.theme;
  
  const [theme, toggleDarkMode] = useDarkMode(themeCookie);
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

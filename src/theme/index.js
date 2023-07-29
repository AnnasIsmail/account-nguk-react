import PropTypes from 'prop-types';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
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

const themeOptions = {
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
  palette,
};

const themeDark = {
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
  palette: { mode: 'dark' },
};

const useDarkMode = () => {
  const [cookies, setCookie] = useCookies();
  const [theme, setTheme] = React.useState(
    cookies.theme === 'light' || cookies.theme === undefined ? themeOptions : themeDark
  );

  const today = new Date();
  const nextYear = new Date();
  nextYear.setDate(today.getDate() + 3600);

  const toggleDarkMode = () => {
    let toTheme = '';
    if (cookies.theme === 'light' || cookies.theme === undefined) {
      setCookie('theme', 'dark', { expires: nextYear, path: '/' });
      setCookie('theme', 'dark', { expires: nextYear, path: '/dashboard' });
      setCookie('theme', 'dark', { expires: nextYear, path: '/account' });
      toTheme = 'dark';
    } else {
      setCookie('theme', 'light', { expires: nextYear, path: '/' });
      setCookie('theme', 'light', { expires: nextYear, path: '/dashboard' });
      setCookie('theme', 'light', { expires: nextYear, path: '/account' });
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

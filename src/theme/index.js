import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
//
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';


// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};


export default function ThemeProvider({ children }) {


  
  const themeOptions = useMemo(
    () => ({
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
      palette
    }),
    []
  );

  const themeDark = useMemo(
    () => ({
      shape: { borderRadius: 8 },
      typography,
      shadows,
      customShadows,
      palette: {mode: 'dark',}
    }),
    []
  );

  let theme = {};
  const themeSwitch = 'dark';

  if (themeSwitch === 'light') {
    theme = createTheme(themeOptions);
  } else {
    theme = createTheme(themeDark);
  }

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

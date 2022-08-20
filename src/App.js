import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

function App() {

  const [login , setLogin] = React.useState(false);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      {(login)?
        <Router />
      :
        <>belom login</>
      }
    </ThemeProvider>
  );
}

export default App;
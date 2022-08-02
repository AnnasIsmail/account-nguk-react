// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
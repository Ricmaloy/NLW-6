import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes'
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/globalStyles';
import { useTheme } from './hooks/useTheme';
import { ThemeProvider } from 'styled-components';

function App() {
  const { theme } = useTheme();
  return (
    <>
      <ThemeProvider theme={theme} >
        <GlobalStyles />
          <AuthContextProvider>
            <Toaster 
              position="top-right"
            />
            <Routes />
          </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

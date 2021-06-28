import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes'
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <>
    <GlobalStyles />
      <AuthContextProvider>
        <Toaster 
          position="top-right"
        />
        <Routes />
      </AuthContextProvider>
    </>
  );
}

export default App;

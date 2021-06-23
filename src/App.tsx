import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/rooms/new" component={NewRoom} exact />
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
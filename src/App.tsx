import { UserProvider } from './providers/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <div>
    <UserProvider>
      <GlobalStyles />
      <Router />
    </UserProvider>
  </div>
);

export default App;

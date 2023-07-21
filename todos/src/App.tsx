import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';

const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <AppRouter />
  </BrowserRouter>
);

export default App;

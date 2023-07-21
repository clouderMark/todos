import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ToastLine from './components/ToastLine/ToastLine';

const App = () => (
  <BrowserRouter>
    <CssBaseline />
    <AppRouter />
    <ToastLine />
  </BrowserRouter>
);

export default App;

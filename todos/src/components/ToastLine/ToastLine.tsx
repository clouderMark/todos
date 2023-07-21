import {Alert, Fade} from '@mui/material';
import {toast as styles} from './styles/toast';
import {useAppSelector} from '../../redux/hooks';
import {selectAlert} from '../../redux/toastSlice';

const ToastLine = () => {
  const {isOpen, message, statusCode} = useAppSelector(selectAlert);
  const type = statusCode && statusCode >= 400 ? 'error' : 'success';

  return (
    <Fade in={isOpen}>
      <Alert severity={type} sx={styles} elevation={6}>
        {message}
      </Alert>
    </Fade>
  );
};

export default ToastLine;

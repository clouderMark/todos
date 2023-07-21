import {useEffect} from 'react';
import {Box, Container} from '@mui/material';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import SortBy from '../components/SortBy';
import {useAppDispatch} from '../redux/hooks';
import {setNames} from '../redux/sortBySlice';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const Todolist = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNames(names));
  }, []);

  return (
    <Container maxWidth={false}>
      <TodoForm />
      <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
        <SortBy />
      </Box>
      <TodoList />
    </Container>
  );
};

export default Todolist;

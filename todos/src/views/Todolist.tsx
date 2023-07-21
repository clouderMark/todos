import {useEffect} from 'react';
import {Box, Container} from '@mui/material';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import SortBy from '../components/SortBy';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setNames} from '../redux/sortBySlice';
import {selectTodo} from '../redux/todoListSlice';

const Todolist = () => {
  const dispatch = useAppDispatch();
  const {todos} = useAppSelector(selectTodo);

  useEffect(() => {
    dispatch(setNames(Array.from(new Set(todos.reduce((acc: string[], cur) => [...acc, ...cur.hash], [])))));
  }, [todos]);

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

import {Box} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTodo} from '../redux/todoListSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const {todos} = useAppSelector(selectTodo);

  return (
    <Box sx={{mt: 2}}>
      {todos.length ? todos.map((todo) => <TodoItem key={todo.id} id={todo.id} />) : 'Cписок задач пуст'}
    </Box>
  );
};

export default TodoList;

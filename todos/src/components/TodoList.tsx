import {Box} from '@mui/material';
import {useAppSelector} from '../redux/hooks';
import {selectTodo} from '../redux/todoListSlice';
import TodoItem from './TodoItem';
import {selectSortBy} from '../redux/sortBySlice';

const TodoList = () => {
  const {todos} = useAppSelector(selectTodo);
  const {hash: query} = useAppSelector(selectSortBy);

  return (
    <Box sx={{mt: 2}}>
      {query.length ? todos
        .filter(({hash}) => !(query.every((el) => hash.indexOf(el))))
        .map((todo) => (
          <TodoItem key={todo.id} id={todo.id} />
        )) : todos.map((todo) => <TodoItem key={todo.id} id={todo.id} />)}
    </Box>
  );
};

export default TodoList;

import {MouseEvent} from 'react';
import {Box, Button, Card, CardContent, IconButton, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addTodo, changeStatusTodo, removeTodo, selectTodo} from '../redux/todoListSlice';
import {selectTodoForm, setItem} from '../redux/todoFormSlice';

interface IProps {
  id: string;
}

const TodoItem = (props: IProps) => {
  const todo = useAppSelector(selectTodo).todos.find((todo) => todo.id === props.id);
  const dispatch = useAppDispatch();
  const {id, message, completed} = useAppSelector(selectTodoForm);

  const handleClick = () => {
    if (todo) {
      if (id) {
        dispatch(addTodo({id, message, completed}));
      }

      dispatch(setItem({...todo}));
      dispatch(removeTodo(todo.id));
    }
  };

  const deleteClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      dispatch(removeTodo(todo.id));
    }
  };

  const handleChange = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      dispatch(changeStatusTodo(todo.id));
    }
  };

  return (
    <>
      {todo ? (
        <Card sx={[todo.completed ? {boxShadow: '0.5px 1px 1px 0.5px tomato'} : {}, {mb: 1}]} onClick={handleClick}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography>{todo.message}</Typography>
            </Box>
            <Box>
              <Button
                onClick={handleChange}
                variant="outlined"
                color={todo.completed ? 'primary' : 'success'}
                sx={{mr: 1}}
              >
                {todo.completed ? 'завершена' : 'В процессе'}
              </Button>
              <IconButton onClick={(e) => deleteClick(e)}>
                <DeleteForeverIcon color="warning" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default TodoItem;

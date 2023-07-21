import {MouseEvent} from 'react';
import {Box, Button, Card, CardContent, IconButton, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  addTodo,
  changeItemPlace,
  changeStatusTodo,
  removeTodo,
  selectTodo,
  setDraggindFalse,
  setDraggindTrue,
} from '../redux/todoListSlice';
import {selectTodoForm, setItem} from '../redux/todoFormSlice';
import {showToast} from '../redux/toastSlice';

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
        dispatch(addTodo({id, message, completed, hash: message.split('#').splice(1)}));
      }

      dispatch(setItem({...todo}));
      dispatch(removeTodo(todo.id));
    }
  };

  const deleteClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      if (todo.completed) {
        dispatch(removeTodo(todo.id));
        dispatch(showToast({message: 'Задача успешно удалена', statusCode: 200}));
      } else {
        dispatch(showToast({message: 'Сперва завершите задачу', statusCode: 400}));
      }
    }
  };

  const handleChange = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      dispatch(changeStatusTodo(todo.id));
    }
  };

  const handleDragStart = () => {
    if (todo) {
      dispatch(setDraggindTrue(todo.id));
    }
  };

  const handleDragEnd = () => {
    if (todo) {
      dispatch(setDraggindFalse(todo.id));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setDraggindFalse(todo!.id));
    dispatch(changeItemPlace(todo!.id));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <>
      {todo ? (
        <Card
          draggable
          sx={[todo.completed ? {boxShadow: '0.5px 1px 1px 0.5px tomato'} : {}, {mb: 1}]}
          onClick={handleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{width: '87%'}}>
              <Box sx={{display: 'flex', flexDirection: 'row-reverse'}}>
                {todo.hash.map((el, i) => (
                  <Typography sx={{mr: 1, color: 'blue'}} key={i}>#{el}</Typography>
                ))}
              </Box>
              <Typography>{todo.message}</Typography>
            </Box>
            <Box sx={{width: '12%'}}>
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

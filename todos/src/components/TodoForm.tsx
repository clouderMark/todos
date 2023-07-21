import {Box, Button, TextField} from '@mui/material';
import {FormEvent} from 'react';
import {v4 as uuid} from 'uuid';
import {resetForm, selectTodoForm, setMessage} from '../redux/todoFormSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addTodo} from '../redux/todoListSlice';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const {message, id, completed} = useAppSelector(selectTodoForm);

  const handlSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedMessage = message.trim();

    if (trimedMessage) {
      const hash = trimedMessage.split('#').splice(1);

      console.log(hash);

      if (id) {
        dispatch(addTodo({message, id, completed, hash}));
      } else {
        dispatch(addTodo({message, id: uuid(), completed: false, hash}));
      }
    }

    dispatch(resetForm());
  };

  const handleReset = () => {
    dispatch(setMessage(''));
  };

  return (
    <Box component="form" onSubmit={handlSave} sx={{display: 'flex', mt: 2}}>
      <Box sx={{flexGrow: 1, mr: 2}}>
        <TextField
          placeholder="Задача"
          name="value"
          value={message}
          onChange={(e) => dispatch(setMessage(e.target.value))}
          sx={{width: '100%'}}
          size="small"
        />
      </Box>
      <Button variant="outlined" type="submit" sx={{mr: 1}}>
        Сохранить
      </Button>
      <Button onClick={handleReset} variant="outlined" color="warning">
        Сбросить
      </Button>
    </Box>
  );
};

export default TodoForm;

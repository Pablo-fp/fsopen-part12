import React from 'react';
import Todo from '../components/Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <Todo
            todo={todo}
            onClickDelete={() => deleteTodo(todo)}
            onClickComplete={() => completeTodo(todo)}
          />
          <hr />
        </React.Fragment>
      ))}
    </>
  );
};

export default TodoList;

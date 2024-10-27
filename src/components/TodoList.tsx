// src/components/TodoList.tsx
import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  enableEditing: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, removeTodo, enableEditing, editTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          enableEditing={enableEditing}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
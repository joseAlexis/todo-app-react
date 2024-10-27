// src/components/TodoItem.tsx
import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  enableEditing: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo, enableEditing, editTodo }) => {
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editTodo(todo.id, editText);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {todo.isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit" className="edit-button">Save</button>
          <button type="button" onClick={() => enableEditing(todo.id)}>Cancel</button>
        </form>
      ) : (
        <>
          <span onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? '✔️ ' : ''}{todo.text}
          </span>
          <button onClick={() => enableEditing(todo.id)} className="edit-button">Edit</button>
          <button onClick={() => removeTodo(todo.id)} className="delete-button">Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { Todo } from './types';
import './App.css';

const API_URL = 'http://localhost:3001/todos'; // URL for the JSON server

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch todos from json-server
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      isEditing: false,
    };

    // Post new todo to json-server
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    // Update todo completion status in json-server
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todos.find(todo => todo.id === id)?.completed }),
    });

    setTodos(updatedTodos);
  };

  const removeTodo = async (id: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const enableEditing = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const editTodo = async (id: string, newText: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    );

    // Update todo text in json-server
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    });

    setTodos(updatedTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const filteredTodos = showCompleted ? todos : todos.filter((todo) => !todo.completed);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <button className="toggle-button" onClick={toggleShowCompleted}>
        {showCompleted ? 'Hide' : 'Show'} Completed Todos
      </button>
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        enableEditing={enableEditing}
        editTodo={editTodo}
      />
    </div>
  );
};

export default App;
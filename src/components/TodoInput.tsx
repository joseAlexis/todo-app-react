// src/components/TodoInput.tsx
import React, { useState } from 'react';
import './TodoInput.css';

interface TodoInputProps {
  addTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleAddClick = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleAddClick} className="add-button">
        Add Todo
      </button>
    </div>
  );
};

export default TodoInput;
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../types';

describe('TodoList Component', () => {
  const todos: Todo[] = [
    { id: '1', text: 'First Todo', completed: false, isEditing: false },
    { id: '2', text: 'Second Todo', completed: true, isEditing: false },
  ];

  const toggleTodoMock = jest.fn();
  const removeTodoMock = jest.fn();
  const enableEditingMock = jest.fn();
  const editTodoMock = jest.fn();

  it('renders the list of todos', () => {
    const { getByText } = render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodoMock}
        removeTodo={removeTodoMock}
        enableEditing={enableEditingMock}
        editTodo={editTodoMock}
      />
    );

    expect(getByText('First Todo')).toBeInTheDocument();
    expect(getByText('Second Todo')).toBeInTheDocument();
  });

  it('calls toggleTodo when a todo is clicked', () => {
    const { getByText } = render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodoMock}
        removeTodo={removeTodoMock}
        enableEditing={enableEditingMock}
        editTodo={editTodoMock}
      />
    );

    fireEvent.click(getByText('First Todo'));
    expect(toggleTodoMock).toHaveBeenCalledWith('1');
  });

  it('applies strikethrough style for completed todos', () => {
    const { getByText } = render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodoMock}
        removeTodo={removeTodoMock}
        enableEditing={enableEditingMock}
        editTodo={editTodoMock}
      />
    );

    const completedTodo = getByText('Second Todo');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });
});
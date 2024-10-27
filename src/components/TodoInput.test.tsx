// src/components/TodoInput.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoInput from './TodoInput';

describe('TodoInput Component', () => {
  it('renders input and button', () => {
    const { getByPlaceholderText, getByText } = render(<TodoInput addTodo={() => {}} />);
    expect(getByPlaceholderText('Add a new task')).toBeInTheDocument();
    expect(getByText('Add Todo')).toBeInTheDocument();
  });

  it('calls addTodo with input value on form submit', () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TodoInput addTodo={addTodoMock} />);
    
    const input = getByPlaceholderText('Add a new task') as HTMLInputElement;
    const button = getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    expect(addTodoMock).toHaveBeenCalledWith('New Task');
    expect(input.value).toBe('');
  });

  it('does not call addTodo if input is empty', () => {
    const addTodoMock = jest.fn();
    const { getByText } = render(<TodoInput addTodo={addTodoMock} />);
    
    const button = getByText('Add Todo');
    fireEvent.click(button);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

describe('TodoItem Component', () => {
  const todo: Todo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
    isEditing: false,
  };

  it('renders edit button and enters edit mode', () => {
    const enableEditingMock = jest.fn();
    const { getByText } = render(
      <TodoItem
        todo={todo}
        toggleTodo={() => {}}
        removeTodo={() => {}}
        enableEditing={enableEditingMock}
        editTodo={() => {}}
      />
    );

    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(enableEditingMock).toHaveBeenCalledWith('1');
  });

  it('updates todo text on save', () => {
    const editTodoMock = jest.fn();
    const { getByDisplayValue, getByText } = render(
      <TodoItem
        todo={{ ...todo, isEditing: true }}
        toggleTodo={() => {}}
        removeTodo={() => {}}
        enableEditing={() => {}}
        editTodo={editTodoMock}
      />
    );

    const input = getByDisplayValue('Test Todo');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    expect(editTodoMock).toHaveBeenCalledWith('1', 'Updated Todo');
  });

  it('cancels editing mode', () => {
    const enableEditingMock = jest.fn();
    const { getByText } = render(
      <TodoItem
        todo={{ ...todo, isEditing: true }}
        toggleTodo={() => {}}
        removeTodo={() => {}}
        enableEditing={enableEditingMock}
        editTodo={() => {}}
      />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(enableEditingMock).toHaveBeenCalledWith('1');
  });
});
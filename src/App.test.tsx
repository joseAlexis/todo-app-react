import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('toggles the visibility of completed todos', () => {
    const { getByText, queryByText } = render(<App />);

    // Add a new todo and mark it as completed
    const input = getByText('Add').previousSibling as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.click(getByText('Add'));

    const todo = getByText('Completed Todo');
    fireEvent.click(todo); // Marks it as completed

    // Hide completed todos
    const toggleButton = getByText('Hide Completed Todos');
    fireEvent.click(toggleButton);
    expect(queryByText('Completed Todo')).not.toBeInTheDocument();

    // Show completed todos again
    fireEvent.click(toggleButton);
    expect(getByText('Completed Todo')).toBeInTheDocument();
  });
});
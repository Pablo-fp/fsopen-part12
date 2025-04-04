// src/components/Todo.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides ".toBeInTheDocument()" matcher
import { expect, test, vi } from 'vitest'; // Use vi for mocking from vitest
import Todo from './Todo';

test('renders todo content correctly when not done', () => {
  const todo = { _id: '1', text: 'Buy groceries', done: false };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={mockDelete}
      onClickComplete={mockComplete}
    />
  );

  // Check if the text is rendered
  expect(screen.getByText('Buy groceries')).toBeInTheDocument();

  // Check if "not done" info is rendered
  expect(screen.getByText('This todo is not done')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getByText('Set as done')).toBeInTheDocument();

  // Check if "done" info is NOT rendered
  expect(screen.queryByText('This todo is done')).not.toBeInTheDocument();
});

test('renders todo content correctly when done', () => {
  const todo = { _id: '2', text: 'Walk the dog', done: true };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn(); // Still need to pass the prop

  render(
    <Todo
      todo={todo}
      onClickDelete={mockDelete}
      onClickComplete={mockComplete}
    />
  );

  // Check text
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();

  // Check if "done" info is rendered
  expect(screen.getByText('This todo is done')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument(); // Delete button still there

  // Check if "not done" info (specifically the "Set as done" button) is NOT rendered
  expect(screen.queryByText('This todo is not done')).not.toBeInTheDocument();
  expect(screen.queryByText('Set as done')).not.toBeInTheDocument();
});

test('calls onClickDelete when delete button is clicked', () => {
  const todo = { _id: '3', text: 'Clean room', done: false };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={mockDelete}
      onClickComplete={mockComplete}
    />
  );

  // Find the delete button (might be multiple, ensure context if needed)
  const deleteButton = screen.getAllByText('Delete')[0]; // Assuming it's the first/only one in this simple component
  fireEvent.click(deleteButton);

  // Check if the mock function was called
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith(todo); // Check if called with the correct todo
  expect(mockComplete).not.toHaveBeenCalled(); // Ensure complete wasn't called
});

test('calls onClickComplete when "Set as done" button is clicked', () => {
  const todo = { _id: '4', text: 'Pay bills', done: false };
  const mockDelete = vi.fn();
  const mockComplete = vi.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={mockDelete}
      onClickComplete={mockComplete}
    />
  );

  const completeButton = screen.getByText('Set as done');
  fireEvent.click(completeButton);

  // Check if the mock function was called
  expect(mockComplete).toHaveBeenCalledTimes(1);
  expect(mockComplete).toHaveBeenCalledWith(todo); // Check if called with the correct todo
  expect(mockDelete).not.toHaveBeenCalled(); // Ensure delete wasn't called
});

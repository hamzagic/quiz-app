import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddStaff from '../AddStaff';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

const MockedProvider = () => {
  return (
    <Provider store={store}>
      <AddStaff />
    </Provider>
  )
}

describe('AddStaff.js', () => {
  beforeEach(() => {
    render(<MockedProvider  />);
  });
  it('renders the form input components', () => {
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates the input values when user types something', () => {
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(firstNameInput, {target: {value: 'John'}});
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
    fireEvent.change(emailInput, {target: {value: 'john@email.com'}});
    fireEvent.change(passwordInput, {target: {value: '1234'}});
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john@email.com');
    expect(passwordInput.value).toBe('1234');
  });

  it('must clear all fields when Cancel button is clicked', () => {
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(firstNameInput, {target: {value: 'John'}});
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});
    fireEvent.change(emailInput, {target: {value: 'john@email.com'}});
    fireEvent.change(passwordInput, {target: {value: '1234'}});
    const clearButton = screen.getByRole('button', {name: 'Clear'});
    fireEvent.click(clearButton);
    expect(firstNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  // todo: add test for when the user clicks the Create button
});
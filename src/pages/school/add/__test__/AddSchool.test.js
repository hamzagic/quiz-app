import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddSchool from '../AddSchool';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

const MockedProvider = () => {
  return (
    <Provider store={store}>
      <AddSchool />
    </Provider>
  )
}

describe('AddSchool.js', () => {
  beforeEach(() => {
    render(<MockedProvider  />);
  })
  it('renders the form input components', async () => {
    const schoolNameInput = screen.getByPlaceholderText("School Name");
    const schoolAddressInput = screen.getByPlaceholderText(/address/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const phoneNumberInput = screen.getByPlaceholderText(/phone number/i);
    expect(schoolNameInput).toBeInTheDocument();
    expect(schoolAddressInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
  });

  it('updates the input values when user types something', async () => {
    const schoolNameInput = screen.getByPlaceholderText("School Name");
    const schoolAddressInput = screen.getByPlaceholderText(/address/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const phoneNumberInput = screen.getByPlaceholderText(/phone number/i);
    fireEvent.change(schoolNameInput, {target: {value: 'Some School'}});
    fireEvent.change(schoolAddressInput, {target: {value: 'Some Address'}});
    fireEvent.change(emailInput, {target: {value: 'Some Email'}});
    fireEvent.change(phoneNumberInput, {target: {value: 'Some Phone Number'}});
    expect(schoolNameInput.value).toBe('Some School');
    expect(schoolAddressInput.value).toBe('Some Address');
    expect(emailInput.value).toBe('Some Email');
    expect(phoneNumberInput.value).toBe('Some Phone Number');
  });

  it('must clear all fields when Cancel button is clicked', async () => {
    const schoolNameInput = screen.getByPlaceholderText("School Name");
    const schoolAddressInput = screen.getByPlaceholderText(/address/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const phoneNumberInput = screen.getByPlaceholderText(/phone number/i);
    fireEvent.change(schoolNameInput, {target: {value: 'Some School'}});
    fireEvent.change(schoolAddressInput, {target: {value: 'Some Address'}});
    fireEvent.change(emailInput, {target: {value: 'Some Email'}});
    fireEvent.change(phoneNumberInput, {target: {value: 'Some Phone Number'}});
    const clearButton = screen.getByRole('button', {name: 'Clear'});
    fireEvent.click(clearButton);
    expect(schoolNameInput.value).toBe('');
    expect(schoolAddressInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(phoneNumberInput.value).toBe('');
  });

  // todo: add test for when the user clicks the Create button
});

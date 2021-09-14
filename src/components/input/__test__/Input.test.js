import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

const mockedSetValue = jest.fn();
const mockedObj = {
  target: { value: 'hello' }
}

describe('Input.js', () => {
  it('renders the input component', () => {
    render(<Input label="Name" value="John" onChange={mockedSetValue} placeholder="First Name" />);
    const inputElement = screen.getByPlaceholderText(/first name/i);
    const labelElement = screen.getByText(/name/i);
    const inputValue = screen.getByDisplayValue(/john/i)
    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
  });

  it('calls the mocked function when input changes', () => {
    const element = render(<Input onChange={mockedSetValue} placeholder="First Name" value="john" />);
    const fn = jest.fn();
    const el = element.getByTestId("test-input");

    fireEvent.change(el, fn(mockedObj));

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(mockedObj);
  })
});

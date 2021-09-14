import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input.js', () => {
  it('renders the input component', () => {
    render(<Input label="Name" placeholder="First Name" />);
    const inputElement = screen.getByPlaceholderText(/first name/i);
    const labelElement = screen.getByText(/name/i);
    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button.js', () => {
  it('renders the button in the component', () => {
    render(<Button title="Submit" />);
    const buttonElement = screen.getByRole('button');
    const buttonText = screen.getByText(/submit/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });
});

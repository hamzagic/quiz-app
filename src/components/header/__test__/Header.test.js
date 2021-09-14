import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Button.js', () => {
  it('renders the Button component', () => {
   // const {debug} = render(<Header />);
    render(<Header />);
   // debug();
   const headingElement = screen.getByText(/quiz app/i);
   expect(headingElement).toBeInTheDocument();
  });
});

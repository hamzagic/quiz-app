import { render, screen } from '@testing-library/react';
import Header from '../Header';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

describe('Button.js', () => {
  it('renders the Button component', () => {
    render(<Header />);
    const iconButton = render(<IconButton />)
    const appBar = render(<AppBar />)
    const toolbar = render(<Toolbar />)
    const headingElement = screen.getByText(/quiz app/i);
    expect(headingElement).toBeInTheDocument();
    expect(iconButton).toBeTruthy();
    expect(appBar).toBeTruthy();
    expect(toolbar).toBeTruthy();
  });
});

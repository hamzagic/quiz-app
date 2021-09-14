import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const MockApp = () => {
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

describe('App.js', () => {
  it('renders the App component', () => {
    render(<MockApp />);

  });
});

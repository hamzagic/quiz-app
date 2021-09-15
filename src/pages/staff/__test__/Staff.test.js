import React from 'react';
import { render, screen } from '@testing-library/react';
import Staff from '../Staff';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import {BrowserRouter} from "react-router-dom";
import AddStaff from '../add/AddStaff';

const MockedProvider = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Staff />
      </BrowserRouter>
    </Provider>
  )
}

const MockedAddStaffProvider = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AddStaff />
      </BrowserRouter>
    </Provider>
  )
}

describe('AddStaff.js', () => {
  beforeEach(() => {
    render(<MockedProvider  />);
  })
  it('does render the AddStaff component', () => {
    // todo: integrate redux state tests

  });
});

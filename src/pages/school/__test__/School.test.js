import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import School from '../School';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import {BrowserRouter} from "react-router-dom";
import AddSchool from '../add/AddSchool';

const MockedProvider = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <School />
      </BrowserRouter>
    </Provider>
  )
}

const MockedAddSchoolProvider = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AddSchool />
      </BrowserRouter>
    </Provider>
  )
}

describe('AddSchool.js', () => {
  beforeEach(() => {
    render(<MockedProvider  />);
  })
  it('does not render the AddSchool component', () => {
    // todo: integrate redux state tests

  });
});

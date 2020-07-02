import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import store from '../../redux/store';
import Sort from './Sort';

const testOptions = {
  value1: 'value1',
  value2: 'value2',
  value3: 'value3'
};

describe('sort testing', () => {
  it('sort renders proper options', () => {
    render(<BrowserRouter><Provider store={store}><Sort values={testOptions}/></Provider></BrowserRouter>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(testOptions).length);
    expect(options[0].value).toBe(testOptions.value1);
  });
});
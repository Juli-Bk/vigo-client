import React from 'react';
import { render} from '@testing-library/react';
import Header from './Header';
import { Router } from '@material-ui/icons';

const dataTest = {
  params: {
    page: ''
  }
};

describe('Testing render header components', () => {
  it('Test render without crash', () => {
    render(<Router><Header match={dataTest}/></Router>);
  });
});

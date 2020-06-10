import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ContactDetails from './ContactDetails';

describe('Contact detail test', () => {
  it('contact details block rendered properly', () => {
    const component = render(<BrowserRouter><ContactDetails /></BrowserRouter>);
    const contactDetails = component.getByTestId('contact-details');
    expect(contactDetails).toBeInTheDocument();
  });
});
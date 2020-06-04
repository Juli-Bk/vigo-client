import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ContactsMap from './ContactsMap';

describe('contacts map testing', () => {
  it('contacts map rendered properly', () => {
    const {getByTestId} = render(<BrowserRouter><ContactsMap /></BrowserRouter>);
    const contactsMap = getByTestId('mapContainer');
    expect(contactsMap).toBeInTheDocument();
  });
});
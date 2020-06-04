import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ContactForm from './ContactForm';

describe('contact us form testing', () => {
  it('form renders title properly', () => {
    const form = render(<BrowserRouter><ContactForm /></BrowserRouter>);
    const title = form.getByText('LEAVE A COMMENT');
    expect(title).toBeInTheDocument();
  });
});
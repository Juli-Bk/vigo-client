import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ContactForm from './ContactForm';
import store from '../../redux/store';
import {Provider} from 'react-redux';

describe('contact us form testing', () => {
  it('form renders title properly', () => {
    const form = render(<Provider store={store}><BrowserRouter><ContactForm /></BrowserRouter></Provider>);
    const title = form.getByText('LEAVE A COMMENT');
    expect(title).toBeInTheDocument();
  });
});
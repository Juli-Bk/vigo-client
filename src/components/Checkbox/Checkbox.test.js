import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Checkbox from './Checkbox';

afterEach(cleanup);

it('Checkbox changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <Checkbox label='Remember password' />
  );

  expect(queryByLabelText(/Remember password/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/Remember password/i));
});

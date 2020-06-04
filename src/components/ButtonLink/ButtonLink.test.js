import React from 'react';
import { render } from '@testing-library/react';
import ButtonLink from './ButtonLink';

describe('button link testing', () => {
  it('button link renders name button', () => {
    const container = render(<ButtonLink name={'Log in'} path={'/'}/>);
    const text = container.getByText('Log in');
    expect(text.textContent).toBe('Log in');
  });
});

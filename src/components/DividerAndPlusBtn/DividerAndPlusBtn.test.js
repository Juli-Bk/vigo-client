import React from 'react';
import { render } from '@testing-library/react';
import DividerAndPlusBtn from './DividerAndPlusBtn';

const handler = jest.fn();

describe('Button Plus testing', () => {
  it('on click button call handler ', () => {
    const box = render(<DividerAndPlusBtn handler={handler} />);
    const plus = box.getByText('+');
    expect(handler).not.toHaveBeenCalled();

    plus.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    expect(handler).toHaveBeenCalled();
  });
});
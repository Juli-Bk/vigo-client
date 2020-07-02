import React from 'react';
import ButtonAddToCart from './AddToCartButton';
import { fireEvent, render } from '@testing-library/react';

const testClasses = 'testBtn';
const testId = '2345676udfghj';
const testQuantity = 5;
const handler = jest.fn();

describe('Button Add testing', () => {
  it('Button has proper classes', () => {
    render(<ButtonAddToCart classes={testClasses}
      id={testId}
      addToCart={handler}
      quantity={testQuantity}
      sizeId={testId}
      colorId={testId}/>);
    expect(document.querySelector('button[type="button"]')).toHaveClass(testClasses);
  });
  it('on button click handler is called', () => {
    render(<ButtonAddToCart classes={testClasses}
      id={testId}
      addToCart={handler}
      quantity={testQuantity}
      sizeId={testId}
      colorId={testId}/>);
    const btn = document.querySelector('button[type="button"]');
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(testId, testQuantity, testId, testId);
  });
});

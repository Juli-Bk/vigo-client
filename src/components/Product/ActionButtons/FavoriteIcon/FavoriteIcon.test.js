import React from 'react';
import FavoriteIcon from './FavoriteIcon';
import { fireEvent, render } from '@testing-library/react';

const testClasses = { testBtn: 'testBtn' };
const testId = '2345676udfghj';
const handler = jest.fn();
const testLabel = 'label';

describe('Favorite Icon testing', () => {
  it('should not render text if not label provided', () => {
    render(<FavoriteIcon classes={testClasses} id={testId} addToWishList={handler}/>);
    expect(document.querySelector('p')).not.toBeInTheDocument();
  });
  it('should render text if not label provided', () => {
    render(<FavoriteIcon classes={testClasses} id={testId} addToWishList={handler} label={testLabel}/>);
    expect(document.querySelector('p')).toBeInTheDocument();
  });
  it('on button click handler is called', () => {
    render(<FavoriteIcon classes={testClasses} id={testId} addToWishList={handler}/>);
    const btn = document.querySelector('svg');
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(testId);
  });
  it('on label click handler is called', () => {
    const button = render(<FavoriteIcon classes={testClasses} id={testId} addToWishList={handler} label={testLabel}/>);
    const label = button.getByText(testLabel);
    fireEvent.click(label);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(testId);
  });
});
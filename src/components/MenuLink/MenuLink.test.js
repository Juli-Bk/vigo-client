import MenuLink from '../MenuLink/MenuLink';
import {expect} from 'chai';
import * as React from 'react';
import {createClientRender, fireEvent} from '../MouseAwayListener/createClientRender';
import store from '../../redux/store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {spy} from 'sinon';

describe('MenuLink', () => {
  const render = createClientRender();
  it('should render the a tag', () => {
    const href = '/products/filter?categoryId=222222';
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MenuLink label='name' href={href}/>
        </BrowserRouter>
      </Provider>
    );
    expect(container.querySelectorAll('a').length).to.equal(1);
  });

  it('should be called onClick handler when the mouseOver event', () => {
    const onClick = spy();
    const href = '/products/filter?categoryId=222222';
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <MenuLink label='name' href={href} onClick={onClick}/>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.mouseOver(container.querySelector('a'));
    expect(onClick.callCount).to.equal(1);
    expect(onClick.args[0].length).to.equal(1);
  });
});
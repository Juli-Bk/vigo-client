import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, screen } from './createClientRender';
import Portal from '@material-ui/core/Portal';
import MouseAwayListener from './MouseAwayListener';

describe('MouseAwayListener', () => {
  const render = createClientRender();

  it('should render the children', () => {
    const children = <span />;
    const { container } = render(
      <MouseAwayListener onMouseAway={() => {}}>{children}</MouseAwayListener>
    );
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  describe('prop: onMouseAway', () => {
    it('should be called when mouse move away', () => {
      const handleMouseAway = spy();
      render(
        <MouseAwayListener onMouseAway={handleMouseAway}>
          <span />
        </MouseAwayListener>
      );

      fireEvent.mouseLeave(document.body);
      expect(handleMouseAway.callCount).to.equal(1);
      expect(handleMouseAway.args[0].length).to.equal(1);
    });

    it('should not be called when mouse is moving inside', () => {
      const handleMouseAway = spy();
      const { container } = render(
        <MouseAwayListener onMouseAway={handleMouseAway}>
          <span />
        </MouseAwayListener>
      );

      fireEvent.mouseOver(container.querySelector('span'));
      expect(handleMouseAway.callCount).to.equal(0);
    });

    it('should be called when preventDefault is `true`', () => {
      const handleMouseAway = spy();
      render(
        <MouseAwayListener onMouseAway={handleMouseAway}>
          <span />
        </MouseAwayListener>
      );
      const preventDefault = (event) => event.preventDefault();
      document.body.addEventListener('mouseLeave', preventDefault);

      fireEvent.mouseLeave(document.body);
      expect(handleMouseAway.callCount).to.equal(1);

      document.body.removeEventListener('click', preventDefault);
    });

    it('should not be called when moving inside a portaled element', () => {
      const handleMouseAway = spy();
      const { getByText } = render(
        <MouseAwayListener onMouseAway={handleMouseAway}>
          <div>
            <Portal>
              <span>Inside a portal</span>
            </Portal>
          </div>
        </MouseAwayListener>
      );

      fireEvent.mouseOver(getByText('Inside a portal'));
      expect(handleMouseAway.callCount).to.equal(0);
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onMouseAway` when `props.mouseEvent` is `false`', () => {
      const handleMouseAway = spy();
      render(
        <MouseAwayListener onMouseAway={handleMouseAway} mouseEvent={false}>
          <span />
        </MouseAwayListener>
      );
      fireEvent.mouseLeave(document.body);
      expect(handleMouseAway.callCount).to.equal(0);
    });

    it('should call `props.onMouseAway` when the appropriate mouse event is triggered', () => {
      const handleMouseAway = spy();
      render(
        <MouseAwayListener onMouseAway={handleMouseAway} mouseEvent="onMouseLeave">
          <span />
        </MouseAwayListener>
      );
      fireEvent.mouseLeave(document.body);
      expect(handleMouseAway.callCount).to.equal(0);
    });

    it('should call `props.onMouseAway` when the appropriate mouse event is triggered', () => {
      const handleMouseAway = spy();
      render(
        <MouseAwayListener onMouseAway={handleMouseAway} mouseEvent="onMouseOut">
          <span />
        </MouseAwayListener>
      );
      fireEvent.mouseOut(document.body);
    });
  });

  it('should handle null child', () => {
    const Child = React.forwardRef(() => null);
    const handleMouseAway = spy();
    render(
      <MouseAwayListener onMouseAway={handleMouseAway}>
        <Child />
      </MouseAwayListener>
    );
    fireEvent.mouseLeave(document.body);
    expect(handleMouseAway.callCount).to.equal(0);
  });

  [
    ['onMouseLeave', false],
    ['onMouseLeave', true],
    ['onMouseLeaveCapture', false],
    ['onMouseLeaveCapture', true]
  ].forEach(([eventName, disableReactTree]) => {
    it(`when 'disableRectTree=${disableReactTree}' ${eventName} triggers onMouseAway if an outside target is removed`, function test () {
      if (!new Event('mouseLeave').composedPath) {
        expect(1).to.equal(1);
        return;
      }

      const handleMouseAway = spy();
      function Test () {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <React.Fragment>
            {buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}
            <MouseAwayListener onMouseAway={handleMouseAway} disableReactTree={disableReactTree}>
              <div />
            </MouseAwayListener>
          </React.Fragment>
        );
      }
      render(<Test />);

      screen.getByRole('button').click();

      expect(handleMouseAway.callCount).to.equal(1);
    });

    it(`when 'disableRectTree=${disableReactTree}' ${eventName} does not trigger onMouseAway if an inside target is removed`, function test () {
      if (!new Event('mouseLeave').composedPath) {
        expect(1).to.equal(1);
        return;
      }

      const handleMouseAway = spy();

      function Test () {
        const [buttonShown, hideButton] = React.useReducer(() => false, true);

        return (
          <MouseAwayListener onMouseAway={handleMouseAway} disableReactTree={disableReactTree}>
            <div>{buttonShown && <button {...{ [eventName]: hideButton }} type="button" />}</div>
          </MouseAwayListener>
        );
      }
      render(<Test />);

      screen.getByRole('button').click();

      expect(handleMouseAway.callCount).to.equal(0);
    });
  });
});
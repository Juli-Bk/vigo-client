import React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  buildQueries,
  cleanup,
  createEvent,
  fireEvent as rtlFireEvent,
  queries,
  render as testingLibraryRender,
  prettyDOM
} from '@testing-library/react/pure';

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf (container, element) {
    return container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`);
  },
  function getMultipleError () {
    return 'Found multiple descriptions. An element should be described by a unique element.';
  },
  function getMissingError () {
    return 'Found no describing element.';
  }
);

const customQueries = { queryDescriptionOf, getDescriptionOf, findDescriptionOf };

function clientRender (element, options = {}) {
  const { baseElement, strict = true, wrapper: InnerWrapper = React.Fragment } = options;

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper ({ children }) {
    return (
      <Mode>
        <InnerWrapper>{children}</InnerWrapper>
      </Mode>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };

  const result = testingLibraryRender(element, {
    baseElement,
    queries: { ...queries, ...customQueries },
    wrapper: Wrapper
  });

  result.setProps = function setProps (props) {
    result.rerender(React.cloneElement(element, props));
    return result;
  };

  result.forceUpdate = function forceUpdate () {
    result.rerender(
      React.cloneElement(element, {
        'data-force-update': String(Math.random())
      })
    );
    return result;
  };

  return result;
}

export function createClientRender (globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  afterEach(async () => {
    await cleanup();
  });

  return function configuredClientRender (element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, strict });
  };
}

const fireEvent = Object.assign(rtlFireEvent, {
  keyDown (element, options = {}) {
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      const error = new Error(
        `\`keydown\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 }
        )}`
      );
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }

    const event = createEvent.keyDown(element, options);
    Object.defineProperty(event, 'key', {
      get () {
        return options.key || '';
      }
    });
    if (options.keyCode !== undefined && event.keyCode === 0) {
      Object.defineProperty(event, 'keyCode', {
        get () {
          return options.keyCode;
        }
      });
    }

    rtlFireEvent(element, event);
  },
  keyUp (element, options = {}) {
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      const error = new Error(
        `\`keyup\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 }
        )}`
      );
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }
    const event = createEvent.keyUp(element, options);
    Object.defineProperty(event, 'key', {
      get () {
        return options.key || '';
      }
    });
    if (options.keyCode !== undefined && event.keyCode === 0) {
      Object.defineProperty(event, 'keyCode', {
        get () {
          return options.keyCode;
        }
      });
    }

    rtlFireEvent(element, event);
  }
});

export * from '@testing-library/react/pure';
export { act, cleanup, fireEvent };

export function render () {
  throw new Error(
    'Don\'t use `render` directly. Instead use the return value from `createClientRender`'
  );
}
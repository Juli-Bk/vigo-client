import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {elementAcceptingRef, exactProp} from '@material-ui/utils';

const useEnhancedEffect = typeof window !== 'undefined'
  ? React.useLayoutEffect
  : React.useEffect;

const useEventCallback = (fn) => {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => (0, ref.current)(...args), []);
};

const ownerDocument = (node) => {
  return (node && node.ownerDocument) || document;
};

const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

const useForkRef = (refA, refB) => {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
};

const mapEventPropToEvent = (eventProp) => {
  return eventProp.substring(2).toLowerCase();
};

const clickedRootScrollbar = (event) => {
  return (
    document.documentElement.clientWidth < event.clientX ||
    document.documentElement.clientHeight < event.clientY
  );
};

/**
 * Listen for onMouseOut event that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people move mouse anywhere else on your page.
 */
const MouseAwayListener = (props) => {
  const {
    children,
    disableReactTree = false,
    mouseEvent = 'onMouseOut',
    onMouseAway,
    touchEvent = 'onTouchEnd'
  } = props;

  const movedRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleOwnRef = React.useCallback((instance) => {
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const handleMouseOutAway = useEventCallback((event) => {
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;

    if (!mountedRef.current || !nodeRef.current || clickedRootScrollbar(event)) {
      return;
    }

    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM;
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      const doc = ownerDocument(nodeRef.current);
      insideDOM =
        !doc.documentElement.contains(event.target) ||
        nodeRef.current.contains(event.target);
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onMouseAway(event);
    }
  });

  const createHandleSynthetic = (handlerName) => (event) => {
    syntheticEventRef.current = true;

    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };

  const childrenProps = {ref: handleRef};

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }

  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener(mappedTouchEvent, handleMouseOutAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener(mappedTouchEvent, handleMouseOutAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleMouseOutAway, touchEvent]);

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }

  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener(mappedMouseEvent, handleMouseOutAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handleMouseOutAway);
      };
    }

    return undefined;
  }, [handleMouseOutAway, mouseEvent]);

  return <React.Fragment>{React.cloneElement(children, childrenProps)}</React.Fragment>;
};

MouseAwayListener.propTypes = {
  /**
   * The wrapped element.
   * If mouse leave this block of elements or touch event occur outside this elements block,
   * the seated handler onMouseAway will be called
   */
  children: elementAcceptingRef.isRequired,
  /**
   * If `true`, the React tree is ignored and only the DOM tree is considered.
   * This prop changes how portaled elements are handled.
   */
  disableReactTree: PropTypes.bool,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onMouseLeave', 'onMouseOut', 'onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "mouseOut" event is detected.
   */
  onMouseAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchEnd', 'onTouchStart', false])
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  MouseAwayListener['propTypes' + ''] = exactProp(MouseAwayListener.propTypes);
}

export default React.memo(MouseAwayListener);
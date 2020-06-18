import {ThemeProvider} from '@material-ui/core';
import theme from '../FiltersTree/FiltersTreeTheme';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import React from 'react';
// web.cjs is required for IE 11 support:
import {animated, useSpring} from 'react-spring/web.cjs';

const TransitionComponent = (props) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    </ThemeProvider>
  );
};

TransitionComponent.propTypes = {
  in: PropTypes.bool
};

export default React.memo(TransitionComponent);
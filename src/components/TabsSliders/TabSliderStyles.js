import { makeStyles } from '@material-ui/core';

const useSliderStyles = makeStyles(theme => ({
  '@global .carousel': {
    height: 480
  },
  header: {
    position: 'relative',
    height: 30,
    [theme.breakpoints.up(724)]: {
      height: 20
    }
  },
  controls: {
    width: 60,
    position: 'absolute',
    top: 5,
    right: 'calc(50% - 30px)',
    [theme.breakpoints.up(724)]: {
      top: '-2rem',
      right: 0
    }
  },
  button: {
    width: 20,
    height: 20,
    border: 'none',
    background: 'none',
    '&:focus': {
      outline: 'none'
    }
  },
  arrow: {
    width: '1rem',
    height: '1rem'
  },
  slide: {
    [theme.breakpoints.between(0, 724)]: {
      '@global .carousel__inner-slide': {
        height: 540
      }
    },
    [theme.breakpoints.up(724)]: {
      '@global .carousel__inner-slide': {
        width: 'calc(100% - 20px)',
        left: 5,
        maxHeight: 480
      }
    }
  }
})
);

export default useSliderStyles;
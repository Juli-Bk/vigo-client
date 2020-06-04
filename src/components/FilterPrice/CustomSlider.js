import { withStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import Slider from '@material-ui/core/Slider';

const CustomSlider = withStyles({
  root: {
    color: colors.paginationActive,
    height: 5,
    width: '80%',
    '@media (min-width: 500px)': {
      width: '50%'
    },
    '@media (min-width: 940px)': {
      width: '70%'
    }
  },
  thumb: {
    height: 16,
    width: 10,
    backgroundColor: '#fff',
    border: `2px solid ${colors.paginationActive}`,
    borderRadius: 3,
    marginRight: '-5px',
    marginLeft: '-5px',
    boxShadow: '#ebebeb 0 2px 2px',
    '&::after': {
      top: '-10px',
      bottom: '-10px'
    },
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px'
    },
    '& .bar': {
      height: 9,
      width: 1,
      backgroundColor: colors.paginationActive,
      marginLeft: 1,
      marginRight: 1
    }
  },
  // material ui needs this empty rule
  active: {},
  track: {
    width: '90%',
    height: 5,
    color: colors.paginationActive
  },
  rail: {
    width: '90%',
    height: 3,
    opacity: 1,
    color: colors.fontOncard
  }
})(Slider);

export default CustomSlider;

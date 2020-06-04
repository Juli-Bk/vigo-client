import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';

const iconStyles = {
  width: 35,
  height: 35,
  padding: 0,
  marginRight: 10,
  color: colors.fontOncard,
  '&:hover': {
    color: fade(colors.fontHover, 0.7)
  }
};
const iconsBpMd = {
  width: 45,
  height: 45,
  marginRight: 10,
  padding: 12,
  color: colors.fontOncard
};

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  menuIcon: {
    display: 'block',
    ...iconStyles,
    [theme.breakpoints.between(0, 1025)]: {
      ...iconsBpMd
    },
    [theme.breakpoints.between(1025, 5000)]: {
      display: 'none'
    }
  }
}));

export default useStyles;
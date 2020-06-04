import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';

const iconStyles = {
  width: 35,
  height: 35,
  padding: 0,
  '&:hover': {
    color: fade(colors.fontHover, 0.7)
  }
};
const iconsBpMd = {
  width: 45,
  height: 45,
  padding: 12
};

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 300
  },
  menuIcon: {
    display: 'block',
    position: 'fixed',
    right: 0,
    top: '30%',
    backgroundColor: colors.listColor,
    color: colors.fontSecondary,
    borderRadius: '5px 0 0 5px',
    ...iconStyles,
    [theme.breakpoints.between(0, 1025)]: {
      ...iconsBpMd
    },
    [theme.breakpoints.between(1025, 5000)]: {
      display: 'none'
    },
    '&:hover': {
      color: colors.fontPrimary
    }

  }
}));

export default useStyles;
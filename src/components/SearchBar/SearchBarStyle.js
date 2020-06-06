import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: '100%',
    height: 'auto'
  },
  headerSearchBlock: {
    display: 'flex',
    flexGrow: 1,
    marginRight: 5,
    minWidth: 300,
    outline: 'none'
  },
  drawerSearchBlock: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    backgroundColor: colors.bgSecondary,
    minWidth: 300,
    padding: 10,
    outline: 'none'
  },
  searchIcon: {
    width: 35,
    height: 35,
    padding: 0,
    marginRight: 10,
    color: colors.fontOncard,
    '&:hover': {
      color: fade(colors.fontHover, 0.9)
    }
  }
}));

export default useStyles;
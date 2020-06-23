import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  tab: {
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: '""',
      height: 1,
      width: '300%',
      background: colors.thinLine,
      bottom: 0,
      left: 0,
      '&$selected': {
        color: colors.noticeColor
      }
    }
  }
}));

export default useStyles;
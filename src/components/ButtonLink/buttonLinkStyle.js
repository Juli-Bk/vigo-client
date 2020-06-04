import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles(theme => (
  {
    styleLink: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 45,
      textDecoration: 'none'
    },

    styleButton: {
      marginRight: 10,
      color: colors.fontOncard,
      borderRadius: '5%',
      textTransform: 'none',
      '&:hover': {
        color: fade(colors.noticeColor, 0.7)
      }
    }
  }
));

export default useStyles;
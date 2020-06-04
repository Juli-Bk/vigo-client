import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    icons: {
      width: 20,
      height: 20
    },
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content'
    },
    label: {
      color: colors.fontSixth,
      fontFamily: fonts.f2,
      fontSize: '0.81rem',
      lineHeight: '1.06rem',
      marginRight: 10,
      whiteSpace: 'nowrap',
      [theme.breakpoints.up(1280)]: {
        fontSize: '1rem'
      }
    }
  }
));

export default useStyles;
import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  logoTitle: {
    marginRight: 10,
    color: colors.fontOncard,
    fontFamily: fonts.f4,
    fontWeight: 800,
    position: 'relative',
    textDecoration: 'none',
    [theme.breakpoints.up(380)]: {
      marginRight: 20
    }
  }
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  title: {
    padding: 20,
    fontSize: '1.25rem',
    fontWeight: '700',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '1rem',
    textTransform: 'uppercase'
  },
  text: {
    fontWeight: '400',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '.63rem'
  },
  bigText: {
    padding: 30
  }
}));

export default useStyles;
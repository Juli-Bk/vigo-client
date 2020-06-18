import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '1rem',
    textTransform: 'uppercase'
  },
  subtitle: {
    fontSize: '1.13rem',
    fontWeight: '700',
    fontFamily: fonts.f2,
    color: colors.fontSecondary,
    marginBottom: '.8rem',
    textTransform: 'capitalize'
  },
  text: {
    fontSize: '1rem',
    fontWeight: '400',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '.63rem'
  }
}));

export default useStyles;
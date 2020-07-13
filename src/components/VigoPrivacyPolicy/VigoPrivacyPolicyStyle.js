import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '1rem',
    textTransform: 'uppercase',
    margin: 10
  },
  text: {
    fontWeight: '400',
    fontFamily: fonts.f2,
    color: colors.fontPrimary,
    marginBottom: '.63rem',
    margin: 15
  }
}));

export default useStyles;
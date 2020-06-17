import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    header: {
      fontSize: 20,
      color: colors.fontPrimary,
      marginBottom: 30,
      fontWeight: 600,
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    button: {
      color: colors.fontSecondary,
      backgroundColor: 'transparent',
      fontWeight: 700,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    input: {
      marginTop: '1.25rem',
      paddingRight: 30,
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase',
      [theme.breakpoints.up(700)]: {
        width: '50%'
      }
    }
  }
));
export default useStyles;
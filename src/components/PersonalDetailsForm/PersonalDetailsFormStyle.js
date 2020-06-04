import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    header: {
      color: colors.fontPrimary,
      fontWeight: 600,
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    button: {
      color: colors.fontSecondary,
      fontWeight: 700,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    text: {
      color: colors.phPrimary
    },

    input: {
      marginTop: '1.25rem',
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    }
  }
));
export default useStyles;
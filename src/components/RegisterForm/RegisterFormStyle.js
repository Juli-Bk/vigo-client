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
      marginTop: '1.25rem',
      color: colors.fontSecondary,
      fontWeight: 700,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    icon: {
      color: colors.borderLight,
      marginBottom: 15
    },

    text: {
      color: colors.phPrimary,
      [theme.breakpoints.up(724)]: {
        margin: '6 auto',
        fontSize: '0.9rem'
      },
      [theme.breakpoints.up(1024)]: {
        fontSize: '0.97rem'
      },
      [theme.breakpoints.up(1080)]: {
        margin: '5 auto',
        fontSize: '1.05em'
      }
    },

    input: {
      marginTop: '1.6rem',
      marginBottom: 7,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    }
  }
));
export default useStyles;
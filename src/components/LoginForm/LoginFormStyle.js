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
      textTransform: 'uppercase',
      [theme.breakpoints.up(724)]: {
        fontSize: '1.6rem'
      },
      [theme.breakpoints.up(964)]: {
        fontSize: '2.2rem'
      }
    },

    button: {
      marginTop: '1.55rem',
      color: colors.fontSecondary,
      fontWeight: 700,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
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
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    }
  }
));
export default useStyles;
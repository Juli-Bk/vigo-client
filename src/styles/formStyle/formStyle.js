import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    modalWindow: {
      width: 500,
      overflow: 'hidden',
      [theme.breakpoints.between(0, 500)]: {
        width: '100%',
        padding: 0
      }
    },
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
    subtitle: {
      color: colors.fontSecondary,
      paddingBottom: 8,
      fontWeight: 700,
      textAlign: 'justify'
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
      margin: '6px 0',
      [theme.breakpoints.up(724)]: {
        fontSize: '0.9rem'
      },
      [theme.breakpoints.up(964)]: {
        fontSize: '0.95rem',
        margin: '5px 0'
      },
      [theme.breakpoints.up(1024)]: {
        fontSize: '0.95rem',
        margin: '11px 0'
      },
      [theme.breakpoints.up(1080)]: {
        fontSize: '1.05em',
        margin: '10px 0'
      }
    },
    input: {
      marginTop: '1.6rem',
      marginBottom: 7,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },
    inputSmall: {
      textAlign: 'center',
      width: '25%',
      marginRight: 10,
      textTransform: 'uppercase'
    },
    checkbox: {
      paddingTop: 10,
      display: 'block'
    },
    radioButton1: {
      marginBottom: 30
    }
  }
));
export default useStyles;
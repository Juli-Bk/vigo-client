import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../colorKit';
import {fonts} from '../fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    modalWindow: {
      width: 500,
      overflow: 'hidden',
      [theme.breakpoints.between(0, 420)]: {
        width: '93%',
        margin: 'auto',
        padding: '0 !important'
      },
      [theme.breakpoints.between(420, 599)]: {
        width: '95%',
        margin: 'auto',
        padding: '0 !important'
      }
    },
    header: {
      color: colors.fontPrimary,
      fontWeight: 600,
      fontFamily: fonts.f4,
      textTransform: 'uppercase',
      fontSize: 'large',
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
    linkButton: {
      color: colors.fontSecondary,
      padding: 16,
      fontWeight: 300,
      border: 'none',
      fontFamily: fonts.f2,
      textDecoration: 'underline',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: 'none',
        color: colors.noticeColor
      }
    },
    appBar: {
      position: 'relative',
      backgroundColor: 'black'
    },
    button: {
      marginTop: '1.25rem',
      color: colors.fontSecondary,
      fontWeight: 700,
      border: `.125rem solid ${colors.fontSecondary}`,
      fontFamily: fonts.f2,
      textTransform: 'uppercase'
    },
    buttonOk: {
      marginTop: '1.25rem',
      width: 'fit-content',
      marginLeft: 30,
      color: colors.fontSecondary,
      fontWeight: 700,
      fontFamily: fonts.f2,
      border: `.125rem solid ${colors.fontSecondary}`,
      textTransform: 'uppercase'
    },
    icon: {
      color: colors.borderLight,
      marginBottom: 15
    },
    closeIconAddress: {
      position: 'absolute',
      right: 0,
      top: 0,
      fill: `2px solid ${colors.borderLight}`,
      '&:hover': {
        borderRadius: 6,
        border: `2px solid ${colors.fontFourth}`,
        cursor: 'pointer'
      },
      [theme.breakpoints.down(550)]: {
        position: 'absolute',
        top: '5px',
        right: '1rem'
      }
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
      marginTop: '1rem',
      marginBottom: 7,
      fontFamily: fonts.f2,
      textTransform: 'uppercase',
      [theme.breakpoints.down(420)]: {
        fontSize: 'inherit',
        marginTop: '0.8rem'
      }
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
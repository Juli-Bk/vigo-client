import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    title: {
      fontSize: '2.65rem',
      textTransform: 'uppercase',
      width: '85%',
      textAlign: 'center',
      color: colors.bgPrimary,
      marginBottom: '0.81rem',
      fontWeight: '700',
      fontFamily: fonts.f1
    },
    titleAlert: {
      fontSize: '5.63rem',
      lineHeight: '3.69rem',
      textTransform: 'uppercase',
      width: '85%',
      textAlign: 'center',
      color: colors.noticeColor,
      fontWeight: '700',
      fontFamily: fonts.f4
    },
    link: {
      cursor: 'pointer',
      textDecoration: 'none'
    },
    subtitle: {
      fontSize: '1.13rem',
      textTransform: 'uppercase',
      color: colors.fontOncard,
      fontWeight: '700',
      fontFamily: fonts.f3
    },
    banner: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bgImagePlug,
      backgroundSize: 'cover'
    },
    [theme.breakpoints.between(724, 939)]: {
      titleAlert: {
        fontSize: '4.69rem'
      },
      title: {
        fontSize: '2.19rem'
      },
      link: {
        fontSize: '.86rem'
      },
      subtitle: {
        fontSize: '.94rem'
      }
    },
    [theme.breakpoints.up(1200)]: {
      titleAlert: {
        fontSize: '7.19rem',
        lineHeight: '5.19rem'
      },
      title: {
        fontSize: '3.13rem'
      },
      link: {
        fontSize: '1rem'
      },
      subtitle: {
        fontSize: '1.38rem'
      }
    }
  }
));

export default useStyles;
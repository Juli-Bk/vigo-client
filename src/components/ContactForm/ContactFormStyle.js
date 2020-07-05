import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  heading: {
    display: 'block',
    textTransform: 'uppercase',
    fontFamily: fonts.f4,
    color: colors.fontPrimary,
    fontSize: '1.38rem',
    marginBottom: '1.19rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.56rem',
      marginBottom: '1.5rem'
    }
  },
  form: {
    marginBottom: '5.13rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '7.63rem'
    }
  },
  leftColumn: {
    height: 'fit-content'
  },
  input: {
    width: '100%',
    marginBottom: '1.5rem'
  },
  textArea: {
    width: '100%',
    height: 200,
    marginBottom: '0.94rem'
  },
  infoMsg: {
    fontSize: '0.81rem',
    lineHeight: '1.25rem',
    color: colors.phSecondary,
    fontFamily: fonts.f2
  },
  captcha: {
    '&>div': {
      maxWidth: '100% !important',
      overflow: 'hidden'
    },
    marginBottom: '1.88rem'
  },
  captchaErr: {
    fontSize: '0.63rem',
    color: colors.noticeColor
  }
}));

export default useStyles;
import {makeStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const iconStyles = {
  width: 35,
  height: 35,
  padding: 0,
  marginRight: 10,
  color: colors.fontOncard,
  '&:hover': {
    color: fade(colors.fontHover, 0.7)
  }
};
const iconsBpMd = {
  width: 45,
  height: 45,
  marginRight: 10,
  padding: 12,
  color: colors.fontOncard
};

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    paddingTop: 24,
    marginBottom: 24
  },
  menuIcon: {
    display: 'block',
    ...iconStyles,
    [theme.breakpoints.between(0, 1025)]: {
      ...iconsBpMd
    },
    [theme.breakpoints.between(1025, 5000)]: {
      display: 'none'
    }
  },
  topMenuBox: {
    display: 'flex',
    paddingLeft: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '48px',
    lineHeight: '0.7rem',
    fontSize: '1.2rem',
    fontWeight: '300',
    fontFamily: fonts.f2,
    textTransform: 'capitalize'
  },
  topMenuLink: {
    textDecoration: 'none',
    color: colors.fontThird,
    fontFamily: fonts.f2,
    fontWeight: 400,
    letterSpacing: '0.001rem',
    '&:visited': {
      textDecoration: 'none',
      cursor: 'pointer',
      outline: 'none'
    },
    '&:link': {
      textDecoration: 'none',
      cursor: 'pointer',
      outline: 'none'
    },
    '&:hover': {
      cursor: 'pointer',
      color: colors.noticeColor
    }
  }
}))
;

export default useStyles;
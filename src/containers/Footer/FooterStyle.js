import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.f3,
    backgroundColor: colors.bgSecondary
  },
  gridItem: {
    color: colors.paginationColor,
    paddingBottom: 30
  },
  item: {
    position: 'relative',
    color: colors.paginationColor,
    cursor: 'pointer',
    textDecoration: 'none',
    textTransform: 'capitalize',
    '&:after': {
      display: 'block',
      position: 'absolute',
      left: 0,
      width: 0,
      height: 1,
      backgroundColor: colors.paginationColor,
      content: '""',
      transition: 'width 0.3s ease-out'
    },
    '&:hover': {
      '&:after': {
        width: '100%'
      }
    },
    '&:focus': {
      '&:after': {
        width: '100%'
      }
    }
  },

  footerContainer: {
    maxWidth: 1240,
    paddingTop: 58,
    [theme.breakpoints.up('xs')]: {
      marginLeft: 50
    }
  },

  title: {
    textTransform: 'uppercase',
    fontFamily: fonts.f4,
    color: colors.fontFifth,
    display: 'inline-block',
    position: 'relative',
    borderBottom: '.09rem solid #999999',
    paddingBottom: 10
  },

  footerSocial: {
    display: 'flex',
    justifyContent: 'center',
    padding: '3.62rem',
    fontFamily: fonts.f3,
    color: colors.paginationColor,
    borderTop: '1px solid #262626',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: 0
    }
  }
}));

export default useStyles;
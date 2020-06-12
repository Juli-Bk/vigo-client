import {makeStyles} from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.image-gallery .image-gallery-left-nav .image-gallery-svg, .image-gallery .image-gallery-right-nav .image-gallery-svg': {
      width: '.8rem',
      height: '1.6rem',
      padding: '0 .6rem',
      strokeWidth: 1.5,

      '&:focus, &:visited, &:hover, &:focus-within, &:active': {
        outline: 'none',
        color: colors.noticeColor
      },
      '.image-gallery-icon:focus': {
        outline: 'none !important'
      },
      [theme.breakpoints.up(420)]: {
        border: `1px solid ${colors.fontOncard}`
      },

      [theme.breakpoints.up(724)]: {
        width: '1.5rem',
        height: '3rem',
        padding: '0 1rem'
      }
    },
    '@media (min-width: 768px)': {
      '.image-gallery .image-gallery-icon:hover': {
        color: colors.noticeColor
      }
    }
  },
  container: {
    position: 'relative',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: '2rem',
    [theme.breakpoints.up('md')]: {
      paddingTop: '3rem'
    },
    '& > a': {
      textDecoration: 'none'
    }
  },
  title: {
    position: 'relative',
    width: 'fit-content',
    marginBottom: '1.4rem',
    color: colors.fontOncard,
    fontSize: '1.5rem',
    fontFamily: fonts.f1,
    textTransform: 'uppercase',
    [theme.breakpoints.up(420)]: {
      marginBottom: '1.6rem',
      fontSize: '2rem'
    },
    [theme.breakpoints.up(568)]: {
      marginBottom: '2.5rem',
      fontSize: '3rem'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '3rem',
      fontSize: '4rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '4rem',
      fontSize: '4.5rem'
    },

    '&::after, &::before': {
      position: 'absolute',
      content: '""',
      height: '.08rem',
      background: colors.fontOncard,
      [theme.breakpoints.up(940)]: {
        height: '.1rem'
      }
    },
    ' &::before': {
      top: '-30%',
      left: '-5%',
      width: '110%',
      [theme.breakpoints.up(940)]: {
        top: '-25%',
        height: '.1rem'
      }
    },

    '&::after': {
      bottom: '-20%',
      left: '40%',
      width: '20%'
    }
  },
  text: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      fontSize: '.7rem',
      display: 'block',
      width: '50%',
      marginBottom: '3rem',
      color: colors.fontOncard,
      fontWeight: 500,
      fontFamily: fonts.f4,
      whiteSpace: 'normal',
      textAlign: 'center',
      textTransform: 'uppercase',
      wordSpacing: '.2rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5rem',
      marginBottom: '4rem'
    }
  },
  button: {
    padding: '.3rem',
    color: colors.fontOncard,
    fontWeight: 'bold',
    fontSize: '.7rem',
    fontFamily: fonts.f3,
    textTransform: 'uppercase',
    background: 'transparent',
    border: `2px solid ${colors.fontOncard}`,
    borderRadius: 5,
    [theme.breakpoints.up(568)]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '.85rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5rem'
    }
  }
}));

export default useStyles;
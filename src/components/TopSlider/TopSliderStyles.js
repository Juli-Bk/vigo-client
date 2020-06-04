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
    fontSize: '1rem',
    [theme.breakpoints.up(420)]: {
      fontSize: '1.5rem'
    },
    [theme.breakpoints.up(568)]: {
      fontSize: '1.7rem'
    },
    [theme.breakpoints.up(724)]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.up(1025)]: {
      fontSize: '2.5rem'
    }
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
    paddingTop: '2em'
  },
  title: {
    position: 'relative',
    width: 'fit-content',
    marginBottom: '1.4em',
    color: colors.fontOncard,
    fontSize: '1.5em',
    fontFamily: fonts.f1,
    textTransform: 'uppercase',

    '&::after, &::before': {
      position: 'absolute',
      height: '.08em',
      background: colors.fontOncard,
      content: '""'
    },
    ' &::before': {
      top: '-30%',
      left: '-5%',
      width: '110%'
    },

    '&::after': {
      bottom: '-20%',
      left: '40%',
      width: '20%'
    }
  },
  text: {
    display: 'none',
    [theme.breakpoints.up(724)]: {
      fontSize: '.4em',
      display: 'block',
      width: '50%',
      marginBottom: '3em',
      color: colors.fontOncard,
      fontWeight: 500,
      fontFamily: fonts.f4,
      whiteSpace: 'normal',
      textAlign: 'center',
      textTransform: 'uppercase',
      wordSpacing: '.2em'
    }
  },
  button: {
    padding: '.3em',
    color: colors.fontOncard,
    fontWeight: 'bold',
    fontSize: '.7em',
    fontFamily: fonts.f3,
    textTransform: 'uppercase',
    background: 'transparent',
    border: `2px solid ${colors.fontOncard}`,
    borderRadius: 5,
    [theme.breakpoints.up(724)]: {
      fontSize: '.5em'
    }
  }
}));

export default useStyles;
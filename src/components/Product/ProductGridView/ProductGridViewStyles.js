import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const iconStyles = {
  fontWeight: 'bold',
  fontSize: '1.5rem',
  border: `2px solid ${colors.fontOncard}`,
  padding: '.2rem',
  borderRadius: 5,
  cursor: 'pointer'
};

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 270,
    margin: '0 auto',
    borderRadius: 0,
    boxShadow: 'none'
  },
  img: {
    maxWidth: '100%',
    height: 350,
    [theme.breakpoints.between(724, 1200)]: {
      height: 280
    }
  },
  imageBox: {
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    color: colors.fontOncard,
    textAlign: 'center',
    textTransform: 'uppercase',
    background: 'rgba(0, 0, 0, .3)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    opacity: 0,
    transition: 'all .4s',

    '&:hover': {
      opacity: 1
    }
  },

  button: {
    padding: '3px 16px',
    color: colors.fontOncard,
    fontFamily: fonts.f3,
    fontWeight: 'bold',
    fontSize: '.9em',
    border: `2px solid ${colors.fontOncard}`,
    transition: 'all .15s ease',

    [theme.breakpoints.up('sm')]: {
      padding: '.2em .6em',
      fontSize: '.8em'
    },
    [theme.breakpoints.between('md', 1025)]: {
      padding: '.45em .2em',
      fontSize: '.7em'
    },
    [theme.breakpoints.up(1025)]: {
      padding: '.4em .3em',
      fontSize: '.75em'
    },
    [theme.breakpoints.up(1200)]: {
      padding: '.2em 1em',
      fontSize: '.9em'
    },
    '&:hover': {
      color: colors.noticeColor
    }
  },
  icon: {
    ...iconStyles,
    color: colors.fontOncard,
    [theme.breakpoints.between('sm', 1025)]: {
      padding: '.2em',
      fontSize: '1.2em'
    },
    '&:hover': {
      fill: colors.noticeColor
    }
  },
  iconChosen: {
    color: colors.noticeColor,
    ...iconStyles,
    [theme.breakpoints.between('sm', 1025)]: {
      padding: '.2em',
      fontSize: '1.2em'
    },
    '&:hover': {
      fill: colors.paginationActive
    }
  },
  pricesBox: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  name: {
    display: 'block',
    width: '100%',
    padding: '.2em 0',
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  description: {
    fontSize: '.75em'
  }
}));

export default useStyles;
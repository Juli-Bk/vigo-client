import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  card: {
    margin: '0 auto 1.5rem auto',
    padding: '1rem',
    borderRadius: 0,
    boxShadow: 'none',
    [theme.breakpoints.up(500)]: {
      display: 'flex'
    }
  },
  content: {
    [theme.breakpoints.up(1280)]: {
      display: 'flex'
    }
  },
  text: {
    color: colors.fontFourth,
    [theme.breakpoints.up(1280)]: {
      marginRight: '1.5rem'
    }
  },
  img: {
    position: 'relative',
    height: 154,
    marginRight: '.5rem',
    cursor: 'pointer',
    width: '50%',
    [theme.breakpoints.down(500)]: {
      float: 'left'
    },
    [theme.breakpoints.up(500)]: {
      width: 160,
      height: 200
    },
    [theme.breakpoints.up(724)]: {
      height: 220
    },
    [theme.breakpoints.up(940)]: {
      width: 200,
      height: 240
    },
    [theme.breakpoints.up(1200)]: {
      width: 216,
      height: 260
    }
  },
  button: {
    padding: '2px 10px',
    color: colors.fontFourth,
    fontFamily: fonts.f3,
    fontWeight: 'bold',
    fontSize: '.9em',
    border: `2px solid ${colors.fontFourth}`,
    transition: 'all .15s ease',
    marginRight: '.3rem',

    [theme.breakpoints.up('sm')]: {
      padding: '.2em .4em',
      fontSize: '.8em'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      padding: '.32em .7em',
      fontSize: '.8em'
    },
    [theme.breakpoints.up(1200)]: {
      padding: '.2em 1em',
      fontSize: '.9em'
    },
    [theme.breakpoints.up(1280)]: {
      marginBottom: '.7rem'
    },
    '&:hover': {
      color: colors.fontOncard,
      background: colors.noticeColor,
      borderColor: colors.noticeColor
    }
  },
  iconBtn: {
    [theme.breakpoints.up(1280)]: {
      marginBottom: '.7rem'
    }
  },
  icon: {
    color: colors.paginationActive,
    fontWeight: 'bold',
    fontSize: '1.3rem',
    border: `2px solid ${colors.paginationActive}`,
    padding: '.2rem',
    borderRadius: 5,
    cursor: 'pointer',
    marginRight: '.3rem',
    [theme.breakpoints.between('sm', 940)]: {
      padding: '.2em',
      fontSize: '1.2em'
    },
    [theme.breakpoints.between(940, 1280)]: {
      padding: '.2em',
      fontSize: '1.3em'
    },
    [theme.breakpoints.up(1280)]: {
      fontSize: '1em'
    },
    '&:hover': {
      fill: colors.fontOncard,
      background: colors.noticeColor,
      borderColor: colors.noticeColor
    }
  },
  actionBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
    [theme.breakpoints.up(1280)]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexShrink: 0,
      padding: '0 1.5rem',
      marginTop: 0
    }
  },
  linkBox: {
    [theme.breakpoints.up(500)]: {
      display: 'block',
      position: 'relative',
      marginRight: '1rem'
    }
  },
  pricesBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up(1280)]: {
      flexDirection: 'row',
      marginBottom: '.7rem'
    }
  },
  name: {
    display: 'block',
    width: '100%',
    marginBottom: '.3rem',
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem'
    }
  },
  description: {
    fontSize: '.75em',
    marginBottom: '1em',
    [theme.breakpoints.up('sm')]: {
      fontSize: '.85rem'
    }
  },
  label: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: '.75rem',
    fontWeight: 'bold'
  }
}));

export default useStyles;
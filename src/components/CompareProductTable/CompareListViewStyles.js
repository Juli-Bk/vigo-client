import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({

  tableRowCompare: {
    width: 'min-content',
    display: 'inline-grid',
    margin: 60
  },
  tableHead: {
    padding: '0 1rem',
    borderRight: `1px solid ${colors.thinLine}`,
    borderTop: `2px solid ${colors.borderLight}`,
    borderBottom: `2px solid ${colors.borderLight} !important`,
    textTransform: 'uppercase',
    color: colors.borderDark,
    fontWeight: 600,
    fontFamily: fonts.f3,
    '&:last-child': {
      borderRight: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '.5rem 1rem'
    }
  },
  img: {
    position: 'relative',
    height: 300,
    width: 250,
    margin: '0 auto',
    [theme.breakpoints.up(500)]: {
      width: 160,
      height: 200,
      cursor: 'pointer',
      marginBottom: 0
    },
    [theme.breakpoints.up(724)]: {
      height: 220,
      cursor: 'pointer',
      marginBottom: 0
    },
    [theme.breakpoints.up(940)]: {
      width: 200,
      height: 240,
      cursor: 'pointer',
      marginBottom: 0
    },
    [theme.breakpoints.up(1200)]: {
      width: 216,
      height: 260,
      cursor: 'pointer',
      marginBottom: 0
    }
  },
  linkBox: {
    position: 'relative',
    display: 'block',
    [theme.breakpoints.up(500)]: {
      marginRight: '2rem'
    }
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    [theme.breakpoints.up(500)]: {
      alignItems: 'flex-start'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem'
    }
  },
  nameCompare: {
    display: 'block',
    textAlign: 'justify',
    marginTop: 20,
    height: 70,
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    [theme.breakpoints.down(500)]: {
      textAlign: 'center'
    }
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.85rem',
    marginTop: 30,
    height: 310
  },
  code: {
    fontSize: '1.3rem',
    marginTop: 30
  },
  closeBtn: {
    fill: `2px solid ${colors.borderDark}`,
    border: '2px solid transparent'
  },
  closeIcon: {
    marginTop: 30,
    fill: `2px solid ${colors.borderDark}`,
    '&:hover': {
      borderRadius: 6,
      border: `2px solid ${colors.borderDark}`,
      cursor: 'pointer'
    },
    [theme.breakpoints.down(550)]: {
      position: 'absolute',
      top: '5px',
      right: '1rem',
      fontSize: '2rem'
    }
  },
  salePrice: {
    color: colors.fontPrice,
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.2rem',
      letterSpacing: '.02em',
      marginTop: 30
    }
  },
  price: {
    textDecoration: 'line-through',
    color: colors.fontSixth,
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.2rem',
      letterSpacing: '.02em',
      marginTop: 30
    }
  },
  btn: {
    color: colors.fontFourth,
    cursor: 'pointer',
    lineHeight: '1.2rem',
    verticalAlign: 'middle',
    '&:hover': {
      color: colors.noticeColor,
      transition: 'all .5s ease'
    }
  },
  borderRight: {
    borderRight: `1.5px solid  ${colors.thinLine}`
  },
  borderLeft: {
    borderLeft: `1.5px solid  ${colors.thinLine}`
  },
  active: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    lineHeight: 'unset'
  },
  boldText: {
    fontWeight: 'bold'
  }
}));

export default useStyles;
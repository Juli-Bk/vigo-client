import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  firstCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  },
  tableRow: {
    borderBottom: `1px solid ${colors.thinLine}`
  },
  tableHead: {
    padding: '0 1rem',
    borderRight: `1px solid ${colors.thinLine}`,
    borderTop: `2px solid ${colors.borderLight}`,
    borderBottom: `2px solid ${colors.borderLight}`,
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
    marginBottom: '1rem',
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
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    textAlign: 'center',
    [theme.breakpoints.up(500)]: {
      textAlign: 'left'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem'
    }
  },
  name: {
    display: 'block',
    marginBottom: '1rem',
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.85rem'
  },
  code: {
    fontSize: '1.3rem'
  },
  codeSmall: {
    fontSize: '1rem'
  },
  closeBtn: {
    fill: `2px solid ${colors.borderDark}`,
    border: '2px solid transparent'
  },
  closeIcon: {
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
      letterSpacing: '.02em'
    }
  },
  price: {
    textDecoration: 'line-through',
    color: colors.fontSixth,
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1.2rem',
      letterSpacing: '.02em'
    }
  },
  select: {
    width: '80%',
    marginBottom: '1rem',
    padding: '.4rem 0 .4rem .3rem',
    borderColor: colors.fontFourth,
    color: colors.paginationActive,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      marginBottom: 0
    }
  }
}));

export default useStyles;
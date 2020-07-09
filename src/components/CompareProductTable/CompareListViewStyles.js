import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  generalTable: {
    display: 'flex',
    width: 1230,
    margin: 'auto'
  },
  compareTable: {
    maxWidth: 1000,
    display: 'flex',
    overflowX: 'scroll',
    margin: 'auto'
  },
  headers: {
    position: 'sticky',
    margin: '0 auto',
    textTransform: 'uppercase',
    color: colors.borderDark,
    fontWeight: 600,
    fontFamily: fonts.f3,
    display: 'inline-grid',
    textAlign: 'right'
  },
  tableRowCompare: {
    display: 'inline-grid'
  },
  tableHead: {
    padding: '0 1rem',
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
    height: 235,
    width: 225,
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
      width: 200,
      height: 235,
      cursor: 'pointer',
      marginBottom: 0
    }
  },
  linkBox: {
    position: 'relative',
    margin: '10px auto',
    display: 'block',
    width: 'max-content'
  },
  textBox: {
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
    margin: '10px auto',
    height: 30,
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.65rem',
    margin: '0 15px',
    minHeight: 125,
    width: 300
  },
  cell: {
    fontSize: '1rem',
    marginTop: 15,
    minHeight: 40
  },
  cellUp: {
    fontSize: '1rem',
    marginTop: 15,
    minHeight: 40,
    textTransform: 'uppercase'
  },
  smallcell: {
    fontSize: '1rem',
    width: 170,
    marginTop: 10,
    minHeight: 20
  },
  bigCell: {
    width: 170,
    minHeight: 125
  },
  codeId: {
    fontSize: '.7rem',
    height: 20
  },
  image: {
    flexDirection: 'column'
  },
  closeIcon: {
    marginTop: 15,
    border: `2px solid ${colors.fontOncard}`,
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
    fontSize: '0.85em',
    height: 40,
    [theme.breakpoints.up(1280)]: {
      fontSize: '1rem',
      letterSpacing: '.02em',
      marginTop: 15
    }
  },
  price: {
    textDecoration: 'line-through',
    color: colors.fontSixth,
    fontWeight: 'bold',
    fontSize: '0.85rem',
    height: 40,
    [theme.breakpoints.up(1280)]: {
      fontSize: '1rem',
      letterSpacing: '.02em',
      marginTop: 15
    }
  }
}));

export default useStyles;
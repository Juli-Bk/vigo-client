import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  generalTable: {
    display: 'flex',
    width: 1230,
    margin: 'auto',
    [theme.breakpoints.down(415)]: {
      width: 1060
    },
    [theme.breakpoints.down(370)]: {
      width: 980
    }
  },
  compareTable: {
    maxWidth: 1000,
    display: 'flex',
    overflowX: 'scroll',
    margin: '0 auto'
  },
  headers: {
    position: 'sticky',
    margin: '0 auto',
    textTransform: 'uppercase',
    color: colors.borderDark,
    fontWeight: 600,
    fontFamily: fonts.f3,
    display: 'inline-grid',
    width: 55,
    textAlign: 'right',
    [theme.breakpoints.down(538)]: {
      margin: 0
    },
    [theme.breakpoints.down(415)]: {
      width: 1,
      margin: 0,
      fontWeight: 500,
      marginRight: '-150px'
    },
    [theme.breakpoints.down(361)]: {
      width: 0,
      display: 'none'
    },
    [theme.breakpoints.down(350)]: {
      width: 0
    }
  },
  tableRowCompare: {
    display: 'inline-grid'
  },
  img: {
    position: 'relative',
    width: 225,
    height: 230,
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
    fontSize: '1.05rem',
    [theme.breakpoints.up(500)]: {
      alignItems: 'flex-start'
    },
    [theme.breakpoints.down(500)]: {
      fontSize: '1rem'
    }
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.65rem',
    margin: '0 5px',
    minHeight: 125,
    width: 300,
    [theme.breakpoints.down(724)]: {
      width: 230
    }
  },
  cell: {
    fontSize: '1rem',
    marginTop: 15,
    minHeight: 40
  },
  cellUp: {
    fontSize: '1rem',
    marginTop: 10,
    minHeight: 40,
    textTransform: 'uppercase'
  },
  smallcell: {
    fontSize: '1rem',
    width: 120,
    marginTop: 10,
    minHeight: 20,
    [theme.breakpoints.down(724)]: {
      fontSize: '0.8rem',
      width: 90
    },
    [theme.breakpoints.down(568)]: {
      minHeight: 25
    }
  },
  bigCell: {
    width: 120,
    minHeight: 130,
    [theme.breakpoints.down(724)]: {
      fontSize: '0.8rem',
      minHeight: 155,
      width: 90
    },
    [theme.breakpoints.down(400)]: {
      fontSize: '0.8rem',
      minHeight: 157,
      width: 90
    }
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
    border: '2px solid transparent',
    fill: `2px solid ${colors.borderDark}`,
    '&:hover': {
      borderRadius: 6,
      border: `2px solid ${colors.borderDark}`,
      cursor: 'pointer'
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
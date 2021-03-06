import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  generalTable: {
    display: 'flex',
    width: 'auto',
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
    margin: '0 auto',
    [theme.breakpoints.down(415)]: {
      maxWidth: 375,
      marginLeft: 8
    },
    [theme.breakpoints.down(330)]: {
      maxWidth: 300,
      marginLeft: 8
    }
  },
  headers: {
    position: 'sticky',
    margin: '0 auto',
    textTransform: 'uppercase',
    color: colors.borderDark,
    fontWeight: 600,
    fontFamily: fonts.f3,
    display: 'inline-grid',
    padding: '0 1.5rem',
    textAlign: 'right',
    [theme.breakpoints.down(724)]: {
      display: 'none',
      margin: 0,
      fontWeight: 500
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
    [theme.breakpoints.down(415)]: {
      width: 150,
      height: 150,
      cursor: 'pointer',
      marginBottom: 0
    },
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
  nameCompare: {
    display: 'block',
    margin: '10px auto',
    height: 30,
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.05rem',
    fontFamily: fonts.f3,
    [theme.breakpoints.up(500)]: {
      alignItems: 'flex-start'
    },
    [theme.breakpoints.down(500)]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.down(415)]: {
      height: 28
    }
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.65rem',
    color: colors.fontThird,
    margin: '0 5px',
    minHeight: 125,
    width: 300,
    [theme.breakpoints.down(724)]: {
      width: 230
    },
    [theme.breakpoints.down(415)]: {
      fontSize: '0.6rem',
      margin: '5px 14px',
      textAlign: 'justify'
    }
  },
  cell: {
    fontSize: '1rem',
    marginTop: 10,
    minHeight: 40,
    fontFamily: fonts.f3,
    color: colors.fontThird,
    [theme.breakpoints.down(724)]: {
      marginTop: 0
    },
    [theme.breakpoints.down(415)]: {
      fontSize: '0.65rem',
      minHeight: 20
    }
  },
  cellUp: {
    fontSize: '1rem',
    marginTop: 10,
    minHeight: 40,
    textTransform: 'uppercase',
    fontFamily: fonts.f3,
    color: colors.fontThird,
    [theme.breakpoints.down(415)]: {
      fontSize: '0.75rem',
      minHeight: 20
    }
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
    },
    [theme.breakpoints.down(415)]: {
      fontSize: '0.65rem',
      minHeight: 20
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
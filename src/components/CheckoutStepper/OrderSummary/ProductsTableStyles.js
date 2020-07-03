import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  firstCell: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up(500)]: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  },
  name: {
    display: 'block',
    marginBottom: '1rem',
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    [theme.breakpoints.down(500)]: {
      textAlign: 'center'
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
  img: {
    height: 150,
    width: 125,
    margin: '0 0 1rem 0',
    [theme.breakpoints.up(500)]: {
      width: 80,
      height: 100,
      cursor: 'pointer',
      margin: '0 1rem 0 0'
    },
    [theme.breakpoints.up(724)]: {
      height: 110,
      cursor: 'pointer',
      margin: '0 1rem 0 0'
    },
    [theme.breakpoints.up(940)]: {
      width: 100,
      height: 120,
      cursor: 'pointer',
      margin: '0 1rem 0 0'
    },
    [theme.breakpoints.up(1200)]: {
      width: 108,
      height: 130,
      cursor: 'pointer',
      margin: '0 1rem 0 0'
    }
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.85rem'
  },
  boldText: {
    fontWeight: 'bold'
  }
}));

export default useStyles;
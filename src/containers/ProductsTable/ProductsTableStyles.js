import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 350
  },
  firstCell: {
    display: 'flex'
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
    height: 210,
    width: '35%',
    cursor: 'pointer',
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
  linkBox: {
    display: 'block',
    position: 'relative',
    marginRight: '2rem'
  },
  textBox: {
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem'
    }
  },
  name: {
    display: 'block',
    marginBottom: '1rem',
    color: colors.fontThird,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.85rem'
  },
  code: {
    fontSize: '1.3rem'
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
    }
  }
}));

export default useStyles;
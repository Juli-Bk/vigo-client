import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';

const cellStyles = {
  fontSize: '.9rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  paddingLeft: '.8rem'
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  table: {
    marginTop: '3rem',
    [theme.breakpoints.up('sm')]: {
      width: '40%'
    }
  },
  total: {
    ...cellStyles,
    fontSize: '1.1rem',
    color: colors.fontFourth,
    borderRight: `1px solid ${colors.thinLine}`
  },
  headCell: {
    ...cellStyles,
    color: colors.fontFourth,
    borderRight: `1px solid ${colors.thinLine}`
  },
  pricesCell: {
    ...cellStyles,
    color: colors.black
  },
  totalPrice: {
    ...cellStyles,
    color: colors.noticeColor,
    fontSize: '1.1rem'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  borderBottom: {
    borderBottom: `1px solid ${colors.thinLine}`
  },
  twoBorders: {
    borderBottom: `1px solid ${colors.thinLine}`,
    borderTop: `1px solid ${colors.thinLine}`
  }
}));

export default useStyles;
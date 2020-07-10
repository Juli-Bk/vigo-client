import { fonts } from '../../../styles/fonts/fontsKit';
import { colors } from '../../../styles/colorKit';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '1.5rem 0'
  },
  rightCell: {
    textAlign: 'center !important'
  },
  orderNo: {
    color: colors.black,
    fontWeight: 'bold'
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: '.85rem'
  },
  text: {
    fontFamily: fonts.f3,
    fontSize: '1rem',
    color: colors.fontPrimary,
    fontWeight: 'normal',
    marginBottom: '.3rem'
  },
  status: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: '1rem',
    textTransform: 'capitalize'
  },
  name: {
    display: 'block',
    color: colors.black,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  product: {
    marginBottom: '1rem',
    display: 'flex',
    alignContent: 'flex-start'
  },
  cellTitle: {
    color: colors.noticeColor,
    fontWeight: 600,
    fontFamily: fonts.f3,
    marginBottom: '.5rem',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  delete: {
    color: colors.noticeColor,
    border: `2px solid ${colors.noticeColor}`,
    borderRadius: 6,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    '&:hover': {
      border: `2px solid ${colors.borderDark}`,
      cursor: 'pointer'
    }
  },
  img: {
    height: 100,
    width: 80,
    margin: '0 1rem 1rem 0'
  },
  lastCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  row: {
    marginBottom: '1rem'
  }
}));

export default useStyles;
import { fonts } from '../../../styles/fonts/fontsKit';
import { colors } from '../../../styles/colorKit';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '0 .5rem'
  },
  title: {
    textTransform: 'uppercase',
    color: colors.fontFourth,
    fontWeight: 'bold'
  },
  text: {
    fontSize: '1rem',
    fontFamily: fonts.f3,
    color: colors.fontPrimary,
    fontWeight: 'normal',
    marginBottom: '.3rem'
  },
  name: {
    display: 'block',
    marginBottom: '1rem',
    color: colors.fontPrimary,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  product: {
    marginBottom: '1rem'
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
  }
}));

export default useStyles;
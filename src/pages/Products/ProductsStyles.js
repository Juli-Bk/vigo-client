import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  topFiltersLine: {
    marginBottom: '3rem',
    color: colors.paginationColor,
    fontFamily: fonts.f2,
    fontSize: '.8rem'
  },
  filters: {
    background: colors.paginationActive
  },
  sortSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '.5rem',
    [theme.breakpoints.up(724)]: {
      justifyContent: 'flex-start',
      padding: '0 .5rem',
      marginBottom: 0,
      paddingTop: '.5rem'
    }
  },
  filterPrice: {
    background: colors.thinLine
  },
  upperLine: {
    marginBottom: '1rem',
    [theme.breakpoints.up(724)]: {
      background: colors.thinLine
    }
  },
  showBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  paginationBottom: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  }
})
);

export default useStyles;
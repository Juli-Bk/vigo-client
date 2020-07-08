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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up(724)]: {
      justifyContent: 'flex-start'
    }
  },
  filterPrice: {
    background: colors.thinLine
  },
  upperLine: {
    marginBottom: '1rem',
    padding: '.2rem',
    [theme.breakpoints.up(724)]: {
      background: colors.thinLine
    }
  },
  showBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  viewBox: {
    marginBottom: '.7rem',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up(724)]: {
      marginBottom: 0,
      justifyContent: 'flex-start'
    }
  },
  paginationBottom: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  itemsContainer: {
    [theme.breakpoints.up(724)]: {
      paddingLeft: 0
    }
  }
})
);

export default useStyles;
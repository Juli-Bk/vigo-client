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
    minWidth: 'fit-content',
    [theme.breakpoints.up(360)]: {
      minWidth: 'unset',
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.up(724)]: {
      justifyContent: 'flex-start',
      margin: '10px 0'
    }
  },
  filterPrice: {
    background: colors.thinLine
  },
  upperLine: {
    marginBottom: '1rem',
    padding: '.2rem',
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.up(360)]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    [theme.breakpoints.up(724)]: {
      background: colors.thinLine,
      justifyContent: 'space-around'
    }
  },
  showBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 'fit-content',
    marginTop: 10,
    [theme.breakpoints.up(360)]: {
      minWidth: 'unset',
      marginTop: 0,
      maxWidth: 150,
      justifyContent: 'center'
    },
    [theme.breakpoints.up(724)]: {
      margin: '10px 0',
      maxWidth: 'fit-content'
    }
  },
  viewBox: {
    marginBottom: '.7rem',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up(724)]: {
      justifyContent: 'flex-start',
      margin: '10px 0'
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
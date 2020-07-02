import { makeStyles } from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up(1280)]: {
      fontSize: '1rem'
    }
  },
  select: {
    marginLeft: 5,
    padding: '2px 10px 2px 5px',
    borderColor: colors.paginationActive,
    color: colors.paginationActive,
    background: colors.fontOncard,
    marginBottom: '1rem',
    '&:focus': {
      outline: 'none',
      background: colors.fontOncard
    }
  }
})
);

export default useStyles;
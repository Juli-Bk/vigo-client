import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  ScrollUpButton__Container: {
    '&:focus, &:visited, &:hover, &:focus-within, &:active': {
      outline: 'none',
      outlineColor: 'transparent'
    }
  }
}));

export default useStyles;
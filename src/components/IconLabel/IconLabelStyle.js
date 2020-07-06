import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
  {
    formIcon: {
      display: 'flex',
      justifyContent: 'flex-start'
    },

    icon: {
      paddingRight: 15,
      fontSize: 20
    },
    label: {
      fontSize: 10,
      [theme.breakpoints.up('sm')]: {
        fontSize: 12
      }
    }

  }
));
export default useStyles;
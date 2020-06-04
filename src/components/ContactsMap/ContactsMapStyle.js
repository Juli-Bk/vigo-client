import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
  {
    map: {
      width: '100%',
      height: 200,
      marginBottom: 40
    },
    [theme.breakpoints.up(560)]: {
      map: {
        height: 300
      }
    },
    [theme.breakpoints.up(724)]: {
      map: {
        height: 350,
        marginBottom: 49
      }
    },
    [theme.breakpoints.up(940)]: {
      map: {
        height: 405
      }
    },
    [theme.breakpoints.up(1200)]: {
      map: {
        height: 500,
        marginBottom: 69
      }
    }
  }
));

export default useStyles;
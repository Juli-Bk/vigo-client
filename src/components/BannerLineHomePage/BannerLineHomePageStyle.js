import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
  {
    fullSize: {
      width: '100%',
      height: '300px',
      marginBottom: '1.25rem'
    },
    halfSize: {
      width: '100%',
      height: 'calc((100% - 20px)/2)'
    },
    bannerColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    bannersCover: {
      marginBottom: '0px !important'
    },
    [theme.breakpoints.up(724)]: {
      fullSize: {
        height: '246px'
      }
    },
    [theme.breakpoints.up(940)]: {
      halfSize: {
        height: 'calc((100% - 30px)/2)'
      },
      fullSize: {
        height: '400px'
      }
    },
    [theme.breakpoints.down(959)]: {
      fullSize: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important'
      },
      halfSize: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important'
      }
    }
  }
));

export default useStyles;
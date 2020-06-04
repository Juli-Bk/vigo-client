import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  logoTitle: {
    marginRight: 20,
    paddingLeft: 10,
    color: colors.fontOncard,
    fontFamily: fonts.f4,
    fontWeight: 800,
    fontSize: 30,
    position: 'relative',
    textDecoration: 'none',
    [theme.breakpoints.between(0, 500)]: {
      marginRight: 0,
      paddingLeft: 0
    }
    // '&:after': {
    //   display: 'block',
    //   position: 'absolute',
    //   bottom: 3,
    //   left: 0,
    //   width: 0,
    //   height: 2,
    //   backgroundColor: colors.fontOncard,
    //   content: '""',
    //   transition: 'width 0.3s ease-out'
    // },
    // '&:hover': {
    //   '&:after': {
    //     width: '100%'
    //   }
    // },
    // '&:focus': {
    //   '&:after': {
    //     width: '100%'
    //   }
    // }
  }
}));

export default useStyles;

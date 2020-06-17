import {makeStyles} from '@material-ui/core/styles';
import {fonts} from '../../styles/fonts/fontsKit';
import {colors} from '../../styles/colorKit';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      [theme.breakpoints.between(0, 724)]: {
        padding: 25,
        width: 300
      }
    },
    0: {
      fontSize: '1.5rem',
      fontFamily: fonts.f2,
      textTransform: 'capitalize',
      color: colors.fontSecondary,
      borderBottom: `1px solid ${colors.listColor}`
    },
    1: {
      fontSize: '1rem',
      fontFamily: fonts.f2,
      textTransform: 'uppercase',
      color: colors.fontSecondary
    },
    2: {
      fontSize: '1rem',
      fontFamily: fonts.f2,
      textTransform: 'uppercase',
      color: colors.fontThird,
      paddingLeft: '1rem',
      borderBottom: `1px solid ${colors.listColor}`
    },
    3: {
      fontSize: '1rem',
      fontFamily: fonts.f2,
      textTransform: 'capitalize',
      color: colors.fontFourth,
      paddingLeft: '0.5rem'
    },
    border: {
      borderBottom: `1px solid ${colors.listColor}`
    },
    iconHover: {
      color: colors.fontThird,
      fontSize: 'inherit',
      width: 20,
      height: 20,
      '&:hover': {
        border: `2px solid ${colors.fontThird}`
      }
    }
  };
});

export default useStyles;
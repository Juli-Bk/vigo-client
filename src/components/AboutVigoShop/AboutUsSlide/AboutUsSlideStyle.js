import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    slide: {
      width: '100%',
      height: '100%'
    },
    image: {
      float: 'left',
      width: 128,
      height: 128,
      marginRight: '1.25rem',
      objectFit: 'contain'
    },
    '@media (min-width: 1200px)': {
      image: {
        width: 170,
        height: 170
      }
    },
    name: {
      marginBottom: '.69rem',
      color: colors.fontSecondary,
      fontSize: '1.25rem',
      fontFamily: fonts.f3,
      textTransform: 'capitalize'
    },
    position: {
      display: 'block',
      marginBottom: '.75rem',
      color: colors.fontFourth,
      fontSize: '.94rem',
      fontFamily: fonts.f3,
      fontStyle: 'italic'
    },
    about: {
      color: colors.fontFourth,
      fontSize: '.88rem',
      fontFamily: fonts.f2
    }
  }
));

export default useStyles;
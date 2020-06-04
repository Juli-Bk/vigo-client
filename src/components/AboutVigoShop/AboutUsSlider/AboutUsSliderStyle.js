import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    btn: {
      fontSize: '1.875rem',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      '&:focus': {
        outline: 'none'
      }
    },
    carousel: {
      maxHeight: 251
    },
    sliderTitle: {
      color: colors.fontSecondary,
      fontSize: '1.125rem',
      fontFamily: fonts.f4,
      lineHeight: '1.875rem',
      textTransform: 'uppercase'
    },
    topWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 'fit-content'
    },
    btnWrapper: {
      width: 'fit-content',
      height: '100%'
    },
    slider: {
      minHeight: 215
    }
  }
));

export default useStyles;
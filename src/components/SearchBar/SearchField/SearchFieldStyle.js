import { makeStyles } from '@material-ui/core/styles';
import {fonts} from '../../../styles/fonts/fontsKit';
import {colors} from '../../../styles/colorKit';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    height: '38px',
    padding: '1px 30px 0 20px !important',
    border: 'none',
    borderRadius: '19px/50%',
    fontSize: '1rem',
    textTransform: 'capitalize',
    fontFamily: fonts.f2,
    color: colors.fontSecondary,
    backgroundColor: colors.bgPrimary,
    '&:focus': {
      borderColor: 'transparent',
      outline: 'none'
    }
  }
}));

export default useStyles;
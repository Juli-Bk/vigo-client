import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    header: {
      color: colors.phPrimary,
      fontFamily: fonts.f3,
      textAlign: 'center',
      marginBottom: 30
    }
  }
));
export default useStyles;
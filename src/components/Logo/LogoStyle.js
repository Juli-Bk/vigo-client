import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(() => ({
  logoTitle: {
    marginRight: 20,
    color: colors.fontOncard,
    fontFamily: fonts.f4,
    fontWeight: 800,
    position: 'relative',
    textDecoration: 'none'
  }
}));

export default useStyles;

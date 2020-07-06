import { makeStyles } from '@material-ui/core/styles';
import {fonts} from '../../styles/fonts/fontsKit';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
  },
  cell: {
    fontFamily: fonts.f2
  }
}));

export default useStyles;
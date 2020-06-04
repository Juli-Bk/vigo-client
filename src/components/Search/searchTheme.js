import {createMuiTheme} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';

const theme = createMuiTheme({

  props: {
    MuiInput: {
      root: {
        height: '38px',
        padding: '1px 30px 0 20px !important',
        border: 'none',
        borderRadius: '19px/50%',
        fontSize: '1rem',
        color: colors.black,
        backgroundColor: colors.fontOncard
      }
    }
  }
});

export default theme;
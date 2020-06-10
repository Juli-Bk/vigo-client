import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const themeMui = createMuiTheme({
  overrides: {
    PrivateTabIndicator: {
      colorPrimary: {
        backgroundColor: colors.fontFourth
      }
    },
    MuiTab: {
      textColorPrimary: {
        '&$selected': {
          color: colors.fontThird
        }
      },
      wrapper: {
        fontSize: 10
      },
      '@media  (min-width: 400px)': {
        fontSize: 16
      }
    }
  }
});
export default themeMui;
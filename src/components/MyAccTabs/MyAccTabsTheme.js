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
      }
    }
  }
});
export default themeMui;
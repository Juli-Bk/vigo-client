import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: colors.payButtonColor,
        color: colors.fontOncard,
        '&:hover': {
          backgroundColor: colors.payButtonColorHover
        }
      },
      containedPrimary: {
        backgroundColor: colors.borderDark,
        '&:hover': {
          backgroundColor: colors.bgSecondary
        }
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 5
      },
      gutters: {
        paddingLeft: 0
      }
    }

  }
}
);

export default theme;
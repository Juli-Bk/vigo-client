import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: 'green',
        color: colors.fontOncard,
        '&:hover': {
          backgroundColor: 'darkGreen'
        }
      },
      containedPrimary: {
        backgroundColor: colors.borderDark,
        '&:hover': {
          backgroundColor: colors.bgSecondary
        }
      }
    },
    MuiTypography: {
      colorPrimary: {
        color: 'transparent'
      },
      root: {
        marginBottom: 20
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: 12
      },
      gutters: {
        paddingLeft: 0
      }
    }

  }
}
);

export default theme;
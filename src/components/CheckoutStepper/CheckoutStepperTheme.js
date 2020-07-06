import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&$active, &$completed': {
          color: colors.borderDark
        }
      }
    },
    MuiStepper: {
      root: {
        paddingLeft: 0
      }
    },
    MuiButton: {
      outlinedPrimary: {
        border: 'none',
        padding: 0,
        '&:hover': {
          border: 'none'
        }
      }
    },
    MuiContainer: {
      root: {
        marginBottom: 30,
        paddingBottom: 30
      }
    },
    MuiStepLabel: {
      label: {
        padding: 0
      }
    }
  }
}
);

export default theme;
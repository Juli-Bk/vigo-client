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
      containedPrimary: {
        backgroundColor: colors.borderDark,
        '&:hover': {
          backgroundColor: colors.bgSecondary
        }
      }
    },
    MuiContainer: {
      root: {
        marginBottom: 30,
        paddingBottom: 30
      }
    },
    MuiTypography: {
      root: {
        padding: '0 120px 30px'
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
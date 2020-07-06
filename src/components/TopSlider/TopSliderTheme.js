import { createMuiTheme } from '@material-ui/core';
import { colors } from '../../styles/colorKit';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: colors.fontOncard
      }
    },
    MuiButtonBase: {
      root: {
        border: `2px solid ${colors.fontOncard}`
      }
    },
    MuiTypography: {
      root: {
        marginBottom: '2.5rem'
      },
      h2: {
        marginBottom: '3rem'
      },
      h6: {
        marginBottom: '2rem'
      }
    }
  }
});
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      item: {
        display: 'flex'
      }
    },
    MuiCardActions: {
      root: {
        display: 'inline-block',
        padding: 0
      }
    },
    MuiTableContainer: {
      root: {
        overflowX: 'hidden'
      }
    },
    MuiTypography: {
      root: {
        textAlign: 'center'
      }
    }
  }
});
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 724,
      md: 940,
      lg: 1280,
      xl: 1920
    }
  },
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
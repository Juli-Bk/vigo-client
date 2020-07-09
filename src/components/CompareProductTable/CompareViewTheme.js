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
        display: 'inline-block'
      }
    },
    MuiTableContainer: {
      root: {
        overflowX: 'hidden'
      }
    }
  }
});
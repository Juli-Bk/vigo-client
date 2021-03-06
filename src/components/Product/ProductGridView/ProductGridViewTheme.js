import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCardActions: {
      root: {
        padding: 0
      }
    },
    MuiCardContent: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 70
      }
    }
  }
});

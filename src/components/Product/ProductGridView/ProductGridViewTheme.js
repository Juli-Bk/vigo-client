import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCardActions: {
      root: {
        padding: 0
      }
    }
  }
});

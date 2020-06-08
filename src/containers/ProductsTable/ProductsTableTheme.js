import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none'
      }
    }
  }
});
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none',
        padding: '16px 0'
      }
    }
    // MuiGrid: {
    //   root: {
    //     flexDirection: 'column'
    //   },
    //   item: {
    //     flexDirection: 'column'
    //   }
    // }
  }

});
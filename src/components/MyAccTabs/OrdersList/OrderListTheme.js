import { createMuiTheme } from '@material-ui/core';

const themeMui = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        verticalAlign: 'top'
      }
    },
    MuiTableCell: {
      root: {
        padding: '1rem 0'
      }
    }
  }
});

export default themeMui;
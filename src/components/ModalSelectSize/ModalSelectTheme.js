import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        justifyContent: 'center'
      }
    }
  }
});

export default theme;
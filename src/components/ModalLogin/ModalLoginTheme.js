import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      outlinedPrimary: {
        border: 'none',
        padding: 0,
        '&:hover': {
          border: 'none'
        }
      }
    }
  }
});

export default theme;
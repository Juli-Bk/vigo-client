import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      gutters: {
        padding: 0
      }
    }
  }
}
);

export default theme;
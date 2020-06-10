import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      gutters: {
        paddingTop: 0
      }
    }
  }
}
);

export default theme;
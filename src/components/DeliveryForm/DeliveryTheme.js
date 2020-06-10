import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      gutters: {
        padding: '0 5px 10px'
      }
    }
  }
}
);

export default theme;
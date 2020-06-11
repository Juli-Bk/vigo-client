import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      gutters: {
        padding: '0 5px 10px'
      }
    }
  },
  MuiListItem: {
    root: {
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: 12
    },
    gutters: {
      paddingLeft: 0
    }
  }
}
);

export default theme;
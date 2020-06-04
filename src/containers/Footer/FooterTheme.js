import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: 0
      }
    },
    MuiBox: {
      root: {
        margin: 0
      }
    }
  }
});

export default theme;
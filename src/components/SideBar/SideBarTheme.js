import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiTreeView: {
      root: {
        padding: '15px !important'
      }
    }
  }
});
export default theme;
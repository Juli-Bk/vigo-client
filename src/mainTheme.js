import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 724,
      md: 940,
      lg: 1280,
      xl: 1920
    }
  }
});

export default theme;
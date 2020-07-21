import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        justifyContent: 'center'
      }
    },
    MuiTypography: {
      root: {
        fontSize: '1.25rem',
        '@media  (max-width: 340px)': {
          fontSize: '1rem'
        }
      }
    }
  }
});

export default theme;
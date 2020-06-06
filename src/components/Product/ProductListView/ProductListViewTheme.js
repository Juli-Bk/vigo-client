import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCardActions: {
      root: {
        padding: 0,
        '@media (min-width: 1280px)': {
          flexDirection: 'column',
          alignItems: 'flex-start'
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: 0,
        textAlign: 'left',
        border: 0,
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    }
  }
});

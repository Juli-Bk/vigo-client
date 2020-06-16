import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCardActions: {
      root: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '@media (min-width: 440px)': {
          flexDirection: 'row',
          justifyContent: 'space-between'
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

import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCardActions: {
      root: {
        padding: 0,
        display: 'inline',
        '@media (min-width: 440px)': {
          display: 'flex',
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
        },
        '@media (max-width: 339px)': {
          marginLeft: '4rem'
        }
      }
    }
  }
});

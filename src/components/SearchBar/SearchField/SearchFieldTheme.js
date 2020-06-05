import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        transition: 'background-color 150ms cubic-bezier(0, 0, 0, 0) 0ms',
        '&:hover': {
          borderColor: 'none'
        }
      }
    },
    MuiSvgIcon: {
      root: {
        transition: 'background-color 150ms cubic-bezier(0, 0, 0, 0) 0ms'
      }
    },
    Mui: {
      '&$focused': {
        outline: 'none'
      }
    },
    MuiAutocomplete: {
      inputFocused: {
        outline: 'none'
      }
    }
  }
});

export default theme;
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
        outline: 'none',
        outlineColor: 'transparent'
      }
    },
    MuiAutocomplete: {
      inputFocused: {
        outline: 'none'
      }
    },
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderWidth: 0
        },
        '&:hover $notchedOutline': {
          borderWidth: 0
        },
        '&$focused $notchedOutline': {
          borderWidth: 0
        }
      },
      focused: {},
      notchedOutline: {}
    }
  }
});

export default theme;
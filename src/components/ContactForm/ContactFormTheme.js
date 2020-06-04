import {createMuiTheme} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
        Mui: {
          error: {
            color: colors.noticeColor,
            borderColor: 'colors.noticeColor !important'
          }
        }
      },
      notchedOutline: {
        borderColor: colors.thinLine
      }
    },
    MuiFormLabel: {
      root: {
        color: colors.thinLine,
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        }
      }
    },
    MuiSvgIcon: {
      root: {
        color: colors.thinLine
      }
    },
    Mui: {
      root: {
        '&$focused': {
          borderColor: '#444444'
        }
      }
    },
    MuiButtonBase: {
      root: {
        border: `2px solid ${colors.fontThird}`,
        color: colors.fontThird,
        fontWeight: 700
      }
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          textTransform: 'capitalize'
        }
      }
    },
    
    MuiButton: {
      outlined: {
        border: '2px solid',
        borderColor: colors.fontThird
      },
      label: {
        textTransform: 'uppercase',
        color: colors.fontThird,
        fontWeight: 700
      }
    }
  }
});

export default theme;
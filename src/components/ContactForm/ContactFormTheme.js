import {createMuiTheme} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 5,
        Mui: {
          error: {
            color: colors.noticeColor,
            borderColor: 'colors.noticeColor !important'
          }
        }
      },
      notchedOutline: {
        borderColor: colors.fontSixth
      }
    },
    MuiFormLabel: {
      root: {
        color: colors.fontSixth,
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        }
      }
    },
    MuiSvgIcon: {
      root: {
        color: colors.fontSixth
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
        color: colors.fontSecondary,
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
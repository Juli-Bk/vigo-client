import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          textTransform: 'capitalize'
        }
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '0.6rem',
        '@media  (min-width: 400px)': {
          fontSize: '0,8rem'
        }
      }
    },

    MuiFormGroup: {
      root: {
        padding: 10
      }
    },

    MuiOutlinedInput: {
      root: {
        Mui: {
          error: {
            color: colors.noticeColor,
            borderColor: 'colors.noticeColor !important'
          }
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: 5,
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        }
      }
    }
  }
});

export default theme;
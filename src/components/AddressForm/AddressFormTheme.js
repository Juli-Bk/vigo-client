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
        fontSize: '0.8rem',
        '@media  (min-width: 400px)': {
          fontSize: '1rem'
        }
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
    MuiFormGroup: {
      root: {
        padding: 10,
        fontSize: 5
      }
    },
    MuiFormLabel: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        }
      }
    }
  }
});

export default theme;
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
    MuiTypography: {
      body1: {
        fontSize: '1rem',
        '@media  (max-width: 400px)': {
          fontSize: '0.7rem'
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        },
        fontSize: 11,
        '@media  (min-width: 320px)': {
          fontSize: 9
        }
      }
    }
  }
});

export default theme;
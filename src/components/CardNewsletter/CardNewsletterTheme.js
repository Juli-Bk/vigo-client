import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      input: {
        paddingBottom: 10
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
          fontSize: 11
        },
        '@media  (min-width: 724px)': {
          fontSize: 9
        },
        '@media  (min-width: 845px)': {
          fontSize: 11
        }
      }
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          color: colors.noticeColor,
          textTransform: 'capitalize'
        }
      }
    }
  }
});

export default theme;
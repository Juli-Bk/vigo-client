import {createMuiTheme} from '@material-ui/core';
import { fonts } from '../../../styles/fonts/fontsKit';
import { colors } from '../../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: fonts.f4,
        color: colors.phPrimary
      }
    },
    MuiSvgIcon: {
      root: {
        color: colors.black
      }
    },
    MuiFormHelperText: {
      root: {
        color: colors.noticeColor,
        '&$error': {
          color: colors.noticeColor
        }
      }
    }
  }
});

export default theme;
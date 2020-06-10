import {createMuiTheme} from '@material-ui/core';
import { fonts } from '../../styles/fonts/fontsKit';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: fonts.f4,
        color: colors.phPrimary,
        '@media  (min-width: 724px)': {
          margin: '16px 5px'
        },
        '@media  (min-width: 1024px)': {
          margin: '20px 5px'
        },
        '@media  (min-width: 1210px)': {
          margin: '10px 5px'
        }
      }
    },
    MuiFormGroup: {
      root: {
        color: colors.phPrimary,

      }
    }
  }
});

export default theme;
import {createMuiTheme} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  palette: {
    background: colors.bgPrimary
  },
  overrides: {
    Mui: {
      root: {
        '&$selected': {
          backgroundColor: 'transparent',
          color: 'inherit',
          fontSize: '1.125rem',
          fontFamily: fonts.f2,
          fontWeight: '600'
        }
      }
    },
    MuiBox: {
      root: {
        backgroundColor: colors.bgPrimary
      }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: colors.fontFourth
      }
    },
    MuiTab: {
      textColorInherit: {
        color: 'inherit',
        opacity: 1,
        backgroundColor: 'transparent'
      },
      root: {
        backgroundColor: colors.bgPrimary,
        minHeight: '35px',
        padding: 0
      },
      wrapper: {
        alignItems: 'flex-start',
        textTransform: 'capitalize',
        lineHeight: '1rem',
        fontSize: '1rem',
<<<<<<< Updated upstream
        fontWeight: '300',
        fontFamily: fonts.f2
=======
        fontWeight: '600',
        fontFamily: fonts.f3,
        color: colors.fontSixth,
        '&:hover': {
          color: colors.borderDark
        },
        '@media (max-width: 900px)': {
          fontSize: '0.8rem'
        }
>>>>>>> Stashed changes
      },
      fullWidth: {
        flexGrow: 'initial'
      }
    },
    MuiTabs: {
      root: {
        backgroundColor: colors.bgPrimary
      }
    }
  }
});

export default theme;
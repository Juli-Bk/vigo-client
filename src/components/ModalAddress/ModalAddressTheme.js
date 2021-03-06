import {createMuiTheme} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      outlinedPrimary: {
        padding: 0,
        '&:hover': {
          border: 'none'
        }
      },
      root: {
        color: colors.fontOncard
      }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: colors.fontFourth
      }
    },
    MuiTab: {
      wrapper: {
        fontFamily: fonts.f2,
        fontSize: '1.5rem',
        '&:hover': {
          color: colors.noticeColor
        }
      }
    },
    MuiDialogActions: {
      root: {
        border: '.125rem solid black',
        borderRadius: 4,
        padding: 3,
        position: 'absolute',
        fontFamily: fonts.f3,
        maxWidth: 'fit-content',
        right: 30,
        bottom: 16
      }
    }
  }
});

export default theme;
import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const themeMui = createMuiTheme({
  overrides: {
    MuiButtonBase: {
      root: {
        transition: 'none',
        '@media (max-width: 723px)': {
          width: '100%'
        }
      }
    },
    MuiTabs: {
      root: {
        backgroundColor: colors.fontOncard
      },
      indicator: {
        backgroundColor: colors.black,
        height: '1px !important',
        left: 0,
        width: '42%',
        '@media (min-width: 400px)': {
          width: '30%'
        },
        '@media (min-width: 550px)': {
          width: '23%'
        },
        '@media (min-width: 724px)': {
          backgroundColor: colors.black,
          height: 1,
          bottom: '98%'
        }
      },
      flexContainer: {
        position: 'relative',
        '@media (min-width: 724px)': {
          '&::before': {
            position: 'absolute',
            content: '""',
            height: 1,
            width: '100%',
            background: colors.thinLine,
            bottom: 0,
            left: 0
          }
        }
      },
      flexContainerVertical: {
        alignItems: 'flex-start'
      }
    },
    MuiTab: {
      textColorPrimary: {
        '&$selected': {
          color: colors.noticeColor
        }
      },
      root: {
        color: colors.fontPrimary,
        textTransform: 'uppercase',
        fontSize: '1rem',
        fontWeight: 500,
        fontFamily: fonts.f4,
        padding: '.5rem 0',
        textAlign: 'left',
        '&$selected': {
          color: colors.bgSecondary,
          fontWeight: 800
        },
        '@media (max-width: 723px)': {
          minWidth: 0,
          overflow: 'visible'
        },
        '@media (min-width: 724px)': {
          minWidth: 0,
          marginRight: '3rem'
        }
      },
      wrapper: {
        alignItems: 'flex-start'
      }
    }
  }
});
export default themeMui;
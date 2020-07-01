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
        backgroundColor: colors.fontFourth,
        bottom: '0%',
        height: '1px !important',
        left: 0,
        width: '42%',
        '@media (min-width: 400px)': {
          width: '30%'
        },
        '@media (min-width: 550px)': {
          width: '23%'
        },
        '@media (max-width: 430px)': {
        }
      },
      flexContainerVertical: {
        alignItems: 'flex-start'
      }
    },
    MuiPaper: {
      root: colors.borderDark
    },
    '&:hover': {
      color: colors.noticeColor
    },
    MuiTab: {
      textColorInherit: {
        color: 'inherit'
      },
      textColorPrimary: {
        textAlign: 'center',
        color: colors.fontFourth,
        '&$selected': {
          color: colors.borderDark,
          '&:hover': {
            color: colors.noticeColor
          }
        }
      },
      root: {
        color: colors.fontPrimary,
        textTransform: 'uppercase',
        fontSize: '1rem',
        fontFamily: fonts.f2,
        padding: '.5rem 0',
        '&$selected': {
          color: colors.bgSecondary
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
        alignItems: 'flex-start',
        '&:hover': {
          color: colors.noticeColor
        }
      }
    }
  }
});
export default themeMui;
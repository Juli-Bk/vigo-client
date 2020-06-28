import {createMuiTheme} from '@material-ui/core';
import { colors } from '../colorKit';
import { fonts } from '../fonts/fontsKit';
import {fade} from '@material-ui/core/styles/colorManipulator';

const theme = createMuiTheme({
  overrides: {
    MuiAvatar: {
      root: {
        width: 25,
        height: 25,
        marginRight: 10
      },
      colorDefault: {
        backgroundColor: colors.fontOncard,
        '&:hover': {
          backgroundColor: fade(colors.fontHover, 0.9)
        }
      }
    },
    MuiSvgIcon: {
      root: {
        color: colors.black
      }
    },
    MuiCardActions: {
      root: {
        padding: '10px 0'
      }
    },
    MuiFormHelperText: {
      root: {
        color: colors.noticeColor,
        textTransform: 'capitalize'
      }
    },
    MuiTypography: {
      body1: {
        fontSize: '1rem',
        '@media  (max-width: 400px)': {
          fontSize: '0.7rem'
        }
      },
      root: {
        fontFamily: fonts.f4,
        color: colors.phPrimary
      }
    },
    MuiIconButton: {
      root: {
        transition: 'none'
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
        '&$error': {
          color: colors.noticeColor,
          borderColor: colors.noticeColor
        },
        fontSize: 11,
        '@media  (min-width: 320px)': {
          fontSize: 9
        },
        '@media  (max-width: 375px)': {
          fontSize: 5
        }
      }
    },
    MuiButton: {
      outlinedPrimary: {
        border: 'none',
        padding: 0,
        '&:hover': {
          border: 'none'
        }
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
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0
      },
      gutters: {
        paddingLeft: 0
      }
    },
    MuiBox: {
      root: {
        padding: '8px 0'
      }
    }
  }
});
export default theme;
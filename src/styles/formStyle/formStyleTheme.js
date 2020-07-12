import {createMuiTheme} from '@material-ui/core';
import {colors} from '../colorKit';
import {fonts} from '../fonts/fontsKit';
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
    MuiRadio: {
      root: {
        margin: 11
      }
    },
    MuiSvgIcon: {
      root: {
        color: colors.fontFourth,
        '@media  (max-width: 734px)': {
          fontSize: 15
        }
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
        paddingRight: 30,
        '@media  (max-width: 400px)': {
          fontSize: '0.7rem'
        }
      },
      root: {
        fontFamily: fonts.f4,
        color: colors.phPrimary,
        position: 'relative'
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
      },
      input: {
        '@media  (max-width: 538px)': {
          fontSize: 'small'
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
    MuiFormControlLabel: {
      root: {
        marginLeft: 0
      }
    },
    PrivateTabIndicator: {
      colorSecondary: {
        backgroundColor: colors.fontFourth
      }
    },
    MuiTab: {
      root: {
        padding: '6px 0'
      },
      wrapper: {
        fontFamily: fonts.f2,
        fontSize: '1.3rem',
        '&:hover': {
          color: colors.noticeColor
        }
      }
    },
    MuiTabs: {
      root: {
        padding: 16,
        display: 'flex',
        minHeight: 48
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
      },
      button: {
        '&:hover': {
          backgroundColor: 'none'
        }
      }
    },
    MuiBox: {
      root: {
        padding: '8px 0'
      }
    },
    PrivateRadioButtonIcon: {
      root: {
        position: 'absolute',
        marginRight: 20,
        color: colors.fontFourth,
        '@media  (max-width: 734px)': {
          paddingRight: 10
        }
      }
    }
  }
});
export default theme;
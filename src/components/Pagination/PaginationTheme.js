import { createMuiTheme } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

export const theme = createMuiTheme({
  overrides: {
    MuiPagination: {
      ul: {
        justifyContent: 'center',
        '@media (min-width: 940px)': {
          justifyContent: 'flex-end'
        },
        '& > li button': {
          borderRadius: 0
        }
      }
    },
    MuiPaginationItem: {
      page: {
        color: colors.paginationColor,
        fontWeight: 'bold',
        fontFamily: fonts.f2,

        '&$selected': {
          backgroundColor: 'none'
        },
        '&:hover': {
          backgroundColor: 'none'
        }
      },
      root: {
        '&$selected, &:hover': {
          border: `2px solid ${colors.paginationActive}`,
          color: colors.paginationColor
        }
      }
    }
  }
});
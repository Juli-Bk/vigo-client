import {createMuiTheme} from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        marginTop: '1.25rem',
        color: colors.fontSecondary,
        fontWeight: 700,
        border: `.125rem solid ${colors.fontSecondary}`,
        fontFamily: fonts.f2,
        textTransform: 'uppercase'
      },
      containedPrimary: {
        backgroundColor: colors.borderDark,
        '&:hover': {
          backgroundColor: colors.bgSecondary
        }
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 5
      },
      gutters: {
        paddingLeft: 0
      }
    }
  }
}
);

export default theme;
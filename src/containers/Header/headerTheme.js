import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: colors.bgSecondary
      },
      root: {
        backgroundColor: colors.bgSecondary
      }
    },
    MuiTabs: {
      indicator: {
        display: 'none'
      }
    },
    MuiTab: {
      root: {
        width: 115,
        height: 60,
        '&:hover': {
          backgroundColor: '#777777'
        },
        '@media (min-width: 0px)': {
          minWidth: 0,
          '&$selected': {
            color: '#2a2a2a',
            fontWeight: 800,
            fontSize: 18,
            backgroundColor: '#777777'
          }
        }
      }
    },
    MuiContainer: {
      root: {
        padding: '0 !important'
      }
    }
  }
});

export default theme;
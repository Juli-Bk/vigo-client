
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
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
    }

  }
});

export default theme;
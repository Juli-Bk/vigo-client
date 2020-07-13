import {createMuiTheme} from '@material-ui/core/styles';
import {colors} from '../../styles/colorKit';

const theme = createMuiTheme({
  overrides: {
    MuiToggleButton: {
      root: {
        border: 'none',
        borderRadius: '0 !important',
        padding: 2,
        '&$selected': {
          backgroundColor: 'transparent',
          border: `2px solid ${colors.paginationActive} !important`
        }
      }
    },
    MuiToggleButtonGroup: {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: 'fit-content'
      }
    }
  }
});

export default theme;
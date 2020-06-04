import { createMuiTheme } from '@material-ui/core';
import { colors } from '../../styles/colorKit';

export const theme = createMuiTheme({
  overrides: {
    MuiSlider: {
      valueLabel: {
        top: '-1rem',
        color: 'transparent',
        borderRadius: 0,
        '& > span > span': {
          color: colors.fontFourth,
          fontWeight: 'bold'
        }
      }
    }
  }
});

import { createMuiTheme } from '@material-ui/core/styles';
import {fonts} from '../../styles/fonts/fontsKit';

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      body1: {
        fontFamily: fonts.f1,
        textAlign: 'center',
        fontSize: '1.9rem',
        width: 'max-content',
        textTransform: 'uppercase',
        '@media (max-width: 500px)': {
          fontSize: '1rem'
        }
      }
    }
  }
});

export default theme;
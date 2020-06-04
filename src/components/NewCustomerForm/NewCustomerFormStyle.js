import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    header: {
      color: colors.fontPrimary,
      fontWeight: 600,
      fontFamily: fonts.f4,
      textTransform: 'uppercase',
      [theme.breakpoints.up(724)]: {
        fontSize: '1.6rem'
      },
      [theme.breakpoints.up(964)]: {
        fontSize: '2.2rem'
      }
    },

    button: {
      color: colors.fontSecondary,
      fontWeight: 700,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      textTransform: 'uppercase'
    },

    text: {
      color: colors.phPrimary,
      margin: '6px 0',
      [theme.breakpoints.up(724)]: {
        fontSize: '0.9rem'
      },
      [theme.breakpoints.up(964)]: {
        fontSize: '0.95rem',
        margin: '5px 0'
      },
      [theme.breakpoints.up(1024)]: {
        fontSize: '0.95rem',
        margin: '11px 0'
      },
      [theme.breakpoints.up(1080)]: {
        fontSize: '1.05em',
        margin: '10px 0'
      }
    }
  }
));
export default useStyles;
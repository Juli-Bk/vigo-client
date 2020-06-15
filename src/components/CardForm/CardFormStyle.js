import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    header: {
      color: colors.fontPrimary,
      fontWeight: 600,
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase'
    },

    button: {
      color: colors.fontOncard,
      fontWeight: 400,
      fontFamily: fonts.f3,
      border: `.125rem solid ${colors.fontSecondary}`,
      fonFamily: fonts.f2,
      textTransform: 'uppercase',
      padding: '10px 0',
      backgroundColor: colors.borderDark,
      '&:hover': {
        backgroundColor: colors.bgSecondary
      }
    },

    inputSmall: {
      textAlign: 'center',
      width: '25%',
      marginRight: 10,
      textTransform: 'uppercase'
    },

    input: {
      marginBottom: 10,
      fontFamily: fonts.f4,
      fonFamily: fonts.f2,
      textTransform: 'uppercase',
      [theme.breakpoints.up(0)]: {
        fontSize: 10
      }
    },

    checkbox: {
      paddingTop: 10,
      display: 'block'
    }
  }
));
export default useStyles;
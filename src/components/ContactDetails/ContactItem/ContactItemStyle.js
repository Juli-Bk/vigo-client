import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    box: {
      display: 'flex',
      marginBottom: '1.75rem'
    },
    contactsBlock: {
      marginLeft: '1.06rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        marginLeft: '1.38rem'
      }
    },
    contact: {
      fontSize: '0.88rem',
      fontFamily: fonts.f2,
      color: colors.fontSixth,
      [theme.breakpoints.up('md')]: {
        fontSize: '0.94rem'
      }
    }
  }
));

export default useStyles;
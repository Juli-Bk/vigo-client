import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    contactDetails: {
      marginBottom: 100
    },
    div: {
      width: '100%',
      marginBottom: '1.94rem',
      borderBottom: `.125rem solid ${colors.thinLine}`
    },
    innerDiv: {
      position: 'relative',
      top: '.125rem',
      display: 'inline-block',
      borderBottom: `.13rem solid ${colors.black}`
    },
    title: {
      display: 'inline',
      color: colors.fontPrimary,
      fontSize: '1.38rem',
      fontFamily: fonts.f3,
      lineHeight: '2.5rem',
      [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem'
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.75rem'
      }
    },
    icon: {
      fill: colors.fontSixth,
      border: `2px solid ${colors.fontSixth}`,
      padding: 5,
      borderRadius: 5
    }
  }
));

export default useStyles;
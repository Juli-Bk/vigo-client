import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    title: {
      marginBottom: '1.13rem',
      color: colors.fontSecondary,
      fontSize: '1.13rem',
      fontFamily: fonts.f4,
      lineHeight: '1.44rem',
      textTransform: 'uppercase'
    },
    text: {
      marginBottom: '1rem',
      marginRight: 10,
      color: colors.fontFourth,
      fontSize: '.875rem',
      fontFamily: fonts.f2,
      lineHeight: '1.25rem'
    },
    link: {
      color: colors.fontSecondary,
      fontSize: '.81rem',
      fontFamily: fonts.f3,
      lineHeight: '1.25rem',
      textTransform: 'uppercase',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in',
      '&:hover': {
        opacity: '0.8'
      }
    }
  }
));

export default useStyles;
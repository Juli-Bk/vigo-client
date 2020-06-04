import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => (
  {
    div: {
      width: '100%',
      marginBottom: '1.56rem',
      borderBottom: `.125rem solid ${colors.thinLine}`
    },
    innerDiv: {
      position: 'relative',
      top: '.125rem',
      display: 'inline-block',
      borderBottom: `.13rem solid ${colors.black}`
    },
    gridItem: {
      marginBottom: '3.75rem'
    },
    title: {
      display: 'inline',
      color: colors.fontPrimary,
      fontSize: '1.38rem',
      fontFamily: fonts.f3,
      lineHeight: '2.5rem'
    },
    '@media (min-width: 768px)': {
      title: {
        fontSize: '1.5rem'
      }
    },
    '@media (min-width: 992px)': {
      title: {
        fontSize: '1.63 rem'
      },
      gridItem: {
        marginBottom: 0
      }
    },
    '@media (min-width: 1200px)': {
      aboutUsBlock: {
        marginBottom: 70
      },
      title: {
        fontSize: '1.88rem'
      }
    }
  }
));

export default useStyles;
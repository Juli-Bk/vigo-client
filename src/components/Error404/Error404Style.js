import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  box: {
    marginBottom: '3.13rem',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-around'
    }
  },
  sorryBlock: {
    maxWidth: 570,
    padding: 20,
    backgroundColor: colors.bg404Message,
    borderRadius: 20,
    [theme.breakpoints.up(760)]: {
      padding: 30
    },
    [theme.breakpoints.up('md')]: {
      padding: 35
    },
    [theme.breakpoints.up('lg')]: {
      padding: '55px 45px'
    }
  },
  dialog: {
    height: 'fit-content'
  },
  sorryTitle: {
    fontSize: '1.88rem',
    fontFamily: fonts.f3,
    textTransform: 'uppercase',
    color: colors.bgSecondary,
    [theme.breakpoints.up(760)]: {
      fontSize: '2.5rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.75rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '4.38rem'
    }
  },
  secondLine: {
    fontSize: '.94rem',
    fontFamily: fonts.f4,
    color: colors.bgSecondary,
    marginBottom: '0.94rem',
    [theme.breakpoints.up(760)]: {
      marginBottom: '1.44rem',
      fontSize: '1.25rem'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '1.88rem',
      fontSize: '1.69rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginBottom: '1.19rem',
      fontSize: '1.88rem'
    }
  },
  thirdLine: {
    fontSize: '0.75rem',
    color: colors.fontFourth,
    fontFamily: fonts.f2,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.94rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.13rem'
    }
  },
  image: {
    width: '100%'
  }
}
));

export default useStyles;
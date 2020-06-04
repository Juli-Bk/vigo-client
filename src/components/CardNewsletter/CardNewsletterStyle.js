import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  newsletter: {
    color: colors.fontSecondary,
    textTransform: 'uppercase',
    border: `.25rem double ${colors.fontFifth}`,
    fontSize: '1rem',
    [theme.breakpoints.up(0)]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.up(420)]: {
      fontSize: '2rem',
      maxWidth: 345,
      margin: '0 auto'
    },
    [theme.breakpoints.up(568)]: {
      fontSize: '1.5rem'
    },
    [theme.breakpoints.up(724)]: {
      fontSize: '2.2rem'
    },
    [theme.breakpoints.up(1025)]: {
      fontSize: '2rem'
    }
  },

  title: {
    position: 'relative',
    fontFamily: fonts.f4,
    fontSize: '0.8em',
    padding: '0.5em',
    fontWeight: 700,
    textAlign: 'center',
    '&:after': {
      position: 'absolute',
      height: '.25rem',
      background: colors.fontSecondary,
      content: '""',
      bottom: '-5%',
      left: '45%',
      width: '15%',
      display: 'inlineBlock'
    },
    [theme.breakpoints.up(0)]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.up(420)]: {
      fontSize: '2rem',
      maxWidth: 300,
      margin: '0 auto'
    },
    [theme.breakpoints.up(568)]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.up(724)]: {
      fontSize: '0.7em'
    },
    [theme.breakpoints.up(845)]: {
      fontSize: '0.74em'
    },
    [theme.breakpoints.up(1025)]: {
      fontSize: '1.2em'
    }
  },

  text: {
    marginTop: ' 1.7em',
    fontSize: '0.4em',
    fontWeight: 500,
    fontFamily: fonts.f3,
    textAlign: 'center',
    letterSpacing: 2,
    [theme.breakpoints.up(0)]: {
      fontSize: '0.73em'
    },
    [theme.breakpoints.up(420)]: {
      fontSize: '0.7em'
    },
    [theme.breakpoints.up(568)]: {
      fontSize: '0.7em'
    },
    [theme.breakpoints.up(724)]: {
      fontSize: '0.5em'
    },
    [theme.breakpoints.up(1025)]: {
      fontSize: '0.7em'
    }
  },

  form: {
    textAlign: 'center'
  },

  email: {
    display: 'inlineBlock',
    margin: '1.4rem auto',
    fontFamily: fonts.f3,
    textTransform: 'uppercase'
  },

  signUpButton: {
    margin: '0 auto',
    color: colors.fontSecondary,
    fontWeight: 700,
    fontSize: 18,
    padding: '0.1rem 0.8rem',
    fontFamily: fonts.f3,
    border: `.125rem solid ${colors.fontSecondary}`
  }
}
));

export default useStyles;

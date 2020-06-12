
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {colors} from '../../styles/colorKit';
import {fonts} from '../../styles/fonts/fontsKit';

const iconStyles = {
  width: 35,
  height: 35,
  padding: 0,
  color: colors.fontOncard,
  '&:hover': {
    color: fade(colors.fontHover, 0.9)
  }
};
const iconsBpMd = {
  width: 45,
  height: 45,
  padding: 12,
  color: colors.fontOncard
};

const blockStyle = {
  display: 'flex',
  flexShrink: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50
};

const useStyles = makeStyles(theme => ({
  gridContainer: {
    marginBottom: 30
  },
  gridItem: {
    height: 60
  },
  topLine: {
    display: 'none',
    height: 30,
    padding: 0,
    backgroundColor: colors.fontOncard,
    [theme.breakpoints.up('lg')]: {
      display: 'block'
    }
  },
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    fontFamily: fonts.f3,
    backgroundColor: colors.bgSecondary,
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      height: 60
    }
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingTop: 0
    }
  },
  burgerMenuBlock: {
    ...blockStyle,
    paddingTop: 0

  },
  block2: {
    ...blockStyle,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    MuiTab: {
      root: {
        minWidth: 115
      }
    }
  },
  headerIconsBlock: {
    ...blockStyle,
    paddingTop: 0
  },
  starIcon: {
    ...iconStyles,
    [theme.breakpoints.up('md')]: {
      ...iconsBpMd

    }
  },
  shoppingBag: {
    ...iconStyles,
    [theme.breakpoints.up('md')]: {
      ...iconsBpMd
    }
  },
  personIcon: {
    ...iconStyles,
    [theme.breakpoints.up('md')]: {
      ...iconsBpMd
    }

  },
  menuIcon: {
    display: 'block',
    ...iconStyles,
    [theme.breakpoints.up('md')]: {
      ...iconsBpMd
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  logoTitle: {
    marginRight: 20,
    paddingLeft: 10,
    color: colors.fontOncard,
    fontWeight: 800,
    fontSize: 30,
    [theme.breakpoints.between(0, 500)]: {
      marginRight: 0,
      paddingLeft: 0
    }
  },

  signUpLogo: {
    color: colors.fontOncard,
    paddingTop: 5,
    paddingRight: 10,
    '&:hover': {
      color: colors.borderLight
    }
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 6,
    paddingRight: 5
  },

  loginControls: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex'
    }
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 35
  }
}));

export default useStyles;
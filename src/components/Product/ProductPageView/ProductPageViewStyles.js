import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const iconStyles = {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  padding: '.2rem',
  borderRadius: 5,
  cursor: 'pointer',
  marginRight: '.3rem'
};

const labelStyles = {
  textTransform: 'uppercase',
  textAlign: 'left',
  fontSize: '.8rem',
  fontWeight: 'bold'
};

const useStyles = makeStyles(theme => ({
  card: {
    margin: '0 auto 1.5rem auto',
    borderRadius: 0,
    boxShadow: 'none',
    padding: '0 .3rem',
    color: colors.fontFourth
  },
  brand: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  divider: {
    margin: '.5rem 0'
  },
  productInfo: {
    marginBottom: '1rem'
  },
  colorName: {
    fontWeight: 'bold'
  },
  button: {
    padding: '.15rem .3rem',
    color: colors.fontOncard,
    background: colors.noticeColor,
    fontFamily: fonts.f3,
    fontWeight: 'bold',
    fontSize: '.9em',
    border: `2px solid ${colors.noticeColor}`,
    transition: 'all .15s ease',
    marginBottom: '.5rem',
    '&:hover': {
      color: colors.noticeColor,
      background: colors.fontOncard,
      borderColor: colors.noticeColor
    },
    [theme.breakpoints.up(440)]: {
      marginBottom: 0
    },
    [theme.breakpoints.up('sm')]: {
      padding: '.1em .8em',
      fontSize: '1em',
      marginRight: '1rem'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      padding: '.32em .7em',
      fontSize: '.8em'
    },
    [theme.breakpoints.up(1200)]: {
      padding: '.2em 1em',
      fontSize: '.9em'
    }
  },
  iconBox: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  icon: {
    ...iconStyles,
    color: colors.paginationActive,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    }
  },
  iconChosen: {
    ...iconStyles,
    color: colors.noticeColor,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    }
  },
  actionBox: {
    marginTop: '1em',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginTop: 0
    }
  },
  link: {
    color: colors.fontFourth,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:visited, &:hover': {
      color: colors.noticeColor
    }
  },
  pricesBox: {
    display: 'inline-block',
    margin: '0 1rem 1rem 0',
    '& > p': {
      display: 'inline-block',
      fontSize: '1.2rem',
      marginRight: '.5rem',
      [theme.breakpoints.up(440)]: {
        marginRight: '1rem'
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem'
      }
    },
    [theme.breakpoints.up(440)]: {
      display: 'flex'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('lg')]: {
      margin: 0
    }
  },
  name: {
    display: 'block',
    width: '100%',
    marginBottom: '.3rem',
    color: colors.fontThird,
    fontSize: '1rem',
    fontFamily: fonts.f3,
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5rem'
    }
  },
  description: {
    fontSize: '.75em',
    marginBottom: '1em',
    [theme.breakpoints.up('sm')]: {
      fontSize: '.85rem'
    }
  },
  label: {
    ...labelStyles,
    [theme.breakpoints.up(440)]: {
      fontSize: '.7rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '.75rem'
    }
  },
  labelChosen: {
    ...labelStyles,
    color: colors.noticeColor,
    [theme.breakpoints.up(440)]: {
      fontSize: '.7rem'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '.75rem'
    }
  },
  colorBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  selectBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  },
  select: {
    width: '100%',
    marginBottom: '1rem',
    padding: '.4rem 0 .4rem .3rem',
    borderColor: colors.fontFourth,
    color: colors.paginationActive,
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      marginBottom: 0,
      marginRight: '2rem'
    }
  },
  form: {}
}));

export default useStyles;
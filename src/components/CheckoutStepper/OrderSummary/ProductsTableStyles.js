import { makeStyles } from '@material-ui/core';
import {fonts} from '../../../styles/fonts/fontsKit';

const useStyles = makeStyles(theme => ({
  table: {
    marginBottom: '2rem'
  },
  img: {
    height: 150,
    width: 125,
    margin: '0 0 1rem 0',
    [theme.breakpoints.up(500)]: {
      width: 80,
      height: 100,
      margin: '0 1rem 0 0'
    },
    [theme.breakpoints.up(724)]: {
      height: 110
    },
    [theme.breakpoints.up(940)]: {
      width: 100,
      height: 120
    },
    [theme.breakpoints.up(1200)]: {
      width: 108,
      height: 130
    }
  },
  details: {
    textTransform: 'uppercase',
    fontSize: '.85rem',
    fontWeight: 'bold',
    fontFamily: fonts.f3
  }
}));

export default useStyles;
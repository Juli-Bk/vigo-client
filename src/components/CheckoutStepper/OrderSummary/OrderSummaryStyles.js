import { makeStyles } from '@material-ui/core';
import { colors } from '../../../styles/colorKit';
import { fonts } from '../../../styles/fonts/fontsKit';

const title = {
  color: colors.borderDark,
  fontFamily: fonts.f3,
  fontSize: '1.2rem',
  fontWeight: 600,
  textTransform: 'uppercase'
};

const useStyles = makeStyles(theme => ({
  data: {
    [theme.breakpoints.down(550)]:
        {marginBottom: '1rem'}
  },
  text: {
    color: colors.fontSixth,
    fontSize: '1rem'
  },
  total: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    [theme.breakpoints.down(550)]: {
      justifyContent: 'flex-start'
    }
  },
  totalPrice: {
    color: colors.noticeColor
  },
  title: title,
  totalTitle: {
    ...title
  }
}));

export default useStyles;
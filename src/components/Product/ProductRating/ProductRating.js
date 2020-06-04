import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiRating: {
      root: {
        fontSize: '1.2rem',
        '@media (min-width: 724px)': {
          fontSize: '1.35rem'
        },
        '@media (min-width: 940px)': {
          fontSize: '1.5rem'
        }
      }
    }
  }
});

const ProductRating = (props) => {
  const {value} = props;

  return (
    <ThemeProvider theme={theme}>
      <Rating name="read-only" value={value} readOnly/>
    </ThemeProvider>
  );
};

ProductRating.propTypes = {
  value: PropTypes.number.isRequired
};

export default React.memo(ProductRating);
import React, { useCallback } from 'react';
import { Button, makeStyles, Box } from '@material-ui/core';
import { colors } from '../../styles/colorKit';
import { fonts } from '../../styles/fonts/fontsKit';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import { deleteProps } from '../../helpers/helpers';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 60
  },
  button: {
    color: colors.paginationColor,
    fontWeight: 700,
    fontFamily: fonts.f2,
    border: `.125rem solid ${colors.paginationActive}`,
    textTransform: 'uppercase',
    marginBottom: '1rem'
  }
}));

const CancelButton = (props) => {
  const classes = useStyles();
  const {location, history} = props;

  const clearFilters = useCallback(() => {
    const parsed = queryString.parse(location.search);
    const props = ['sort', 'minPrice', 'maxPrice', 'color', 'size', 'perPage', 'startPage'];
    const cleared = deleteProps(parsed, props);
    const updatedSearch = queryString.stringify(cleared);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, location.search]);

  return (
    <Box className={classes.container}>
      <Button
        className={classes.button}
        type='submit'
        onClick={clearFilters}
        size='large'
        variant='outlined'>
        Clear All Filters
      </Button>
    </Box>
  );
};
export default React.memo(withRouter(CancelButton));
import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { ThemeProvider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { theme } from './PaginationTheme';
import { setCurrentPage } from '../../redux/actions/actions';

const PaginationRounded = (props) => {
  const { perPage, total, currentPage, setCurrentPage, history, location } = props;
  const totalPagesAmount = total / perPage;
  const count = totalPagesAmount > 1 ? Math.ceil(totalPagesAmount) : 0;

  const handleChange = (event, value) => {
    setCurrentPage(Number(value));
    const parsed = queryString.parse(location.search);
    parsed.startPage = Number(value);
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  };

  return (
    <ThemeProvider theme={theme}>
      {count > 0 &&
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        size="small"
        page={currentPage}
        onChange={handleChange}/>
      }
    </ThemeProvider>
  );
};

const mapStateToProps = store => {
  return { currentPage: store.currentPage };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPage: pageNumber => dispatch(setCurrentPage(pageNumber))
  };
};

PaginationRounded.propTypes = {
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(PaginationRounded)));
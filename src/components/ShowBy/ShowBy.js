import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProductsPerPage } from '../../redux/actions/actions';
import SelectBox from '../SelectBox/SelectBox';
import useStyles from '../Sort/SortStyles';
import queryString from 'query-string';

const ShowBy = (props) => {
  const { productsPerPage, setProductsPerPage, step, location, history } = props;
  const classes = useStyles();
  const values = [step, step * 2, step * 3];

  const options = values.map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  const handleChange = (event) => {
    setProductsPerPage(Number(event.target.value));
    const parsed = queryString.parse(location.search);
    parsed.perPage = event.target.value;
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  };

  return (
    <SelectBox value={productsPerPage}
      handleChange={handleChange}
      options={options}
      classes={classes}
      label={'Show: '}/>
  );
};

const mapStateToProps = store => {
  return {
    productsPerPage: store.productsPerPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProductsPerPage: value => dispatch(setProductsPerPage(value))
  };
};

ShowBy.propTypes = {
  productsPerPage: PropTypes.number.isRequired,
  setProductsPerPage: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowBy)));
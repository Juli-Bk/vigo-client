import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProductsPerPage } from '../../redux/actions/actions';
import SelectBox from '../SelectBox/SelectBox';
import useStyles from '../SelectBox/SelectBoxStyles';

const ShowBy = (props) => {
  const { productsPerPage, setProductsPerPage, step } = props;
  const classes = useStyles();
  const values = [step, step * 2, step * 3];

  const options = values.map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  const handleChange = (event) => {
    setProductsPerPage(Number(event.target.value));
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

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ShowBy));
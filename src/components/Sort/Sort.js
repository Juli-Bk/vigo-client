import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectSimple from '../Select/SelectSimple';
import { setSortingOption } from '../../redux/actions/actions';
import useStyles from '../Select/SelectSimpleStyles';

const Sort = (props) => {
  const { sortingOption, setSortingOption, values } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    setSortingOption(event.target.value);
  };

  const options = Object.values(values).map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  return (
    <SelectSimple value={sortingOption}
      classes={classes}
      handleChange={handleChange}
      options={options}
      label={'Sort By: '}/>
  );
};

const mapStateToProps = store => {
  return {
    sortingOption: store.sortingOption
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSortingOption: option => dispatch(setSortingOption(option))
  };
};

Sort.propTypes = {
  sortingOption: PropTypes.string.isRequired,
  setSortingOption: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Sort));
import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import { connect } from 'react-redux';
import SelectBox from '../SelectBox/SelectBox';
import { setSortingOption } from '../../redux/actions/actions';
import useStyles from './SortStyles';
import globalConfig from '../../globalConfig';

const Sort = (props) => {
  const { sortingOption, setSortingOption, values, history, location } = props;
  const classes = useStyles();
  const parsed = useMemo(() => queryString.parse(location.search), [location.search]);

  useEffect(() => {
    if (parsed.sort) {
      setSortingOption(globalConfig.QueryToSortOption[parsed.sort]);
    }
  }, [parsed.sort, setSortingOption]);

  const handleChange = useCallback((event) => {
    setSortingOption(event.target.value);
    parsed.sort = globalConfig.SortOptionToQuery[event.target.value];
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, parsed, setSortingOption]);

  const options = Object.values(values).map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  return (
    <SelectBox value={sortingOption}
      classes={classes}
      handleChange={handleChange}
      options={options}
      label={'Sort By: '}/>
  );
};

const mapStateToProps = store => {
  return {
    sortingOption: store.productsOptions.sortingOption
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
  values: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(Sort)));
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SelectBox from '../SelectBox/SelectBox';
import useStyles from '../Sort/SortStyles';
import queryString from 'query-string';

const ShowBy = (props) => {
  const {step, location, history} = props;
  const classes = useStyles();
  const parsed = useMemo(() => queryString.parse(location.search), [location.search]);
  const values = useMemo(() => [step, step * 2, step * 3], [step]);

  const options = values.map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  const handleChange = useCallback((event) => {
    parsed.perPage = event.target.value;
    const updatedSearch = queryString.stringify(parsed);
    history.push(`/products/filter?${updatedSearch}`);
  }, [history, parsed]);

  return (
    <SelectBox value={parsed.perPage || step}
      handleChange={handleChange}
      options={options}
      classes={classes}
      label={'Show: '}/>
  );
};

ShowBy.propTypes = {
  step: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default React.memo(withRouter(ShowBy));
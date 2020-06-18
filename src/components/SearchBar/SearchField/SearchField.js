import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextField, ThemeProvider} from '@material-ui/core';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {connect} from 'react-redux';

import useStyles from './SearchFieldStyle';
import theme from './SearchFieldTheme';
import {withRouter} from 'react-router';
import {toggleSearchBarOpen} from '../../../redux/actions/actions';

const filter = createFilterOptions();

const SearchField = (props) => {
  const {history, categories, toggleSearchBarOpen} = props;

  const classes = useStyles();
  const [value, setValue] = useState(null);
  const filterOpt = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        title: params.inputValue
      });
    }

    return filtered;
  };
  const handleSearchStringChange = (event, newValue) => {
    const searchString = (newValue && newValue.title) || newValue;
    if (!searchString) return;

    const href = `/products/search/${searchString}`;
    history.push(href);
    setValue(null);
    toggleSearchBarOpen(false);
  };

  const list = new Map();
  const searchList = categories
    .filter(c => c.level === 3)
    .map(c => list.set(c.name, {
      title: c.name,
      id: c._id
    }));

  const searchComponent = (
    <Autocomplete
      value={value}
      style={{
        width: '100%',
        outline: 'none'
      }}
      classes={classes}
      onChange={handleSearchStringChange}
      filterOptions={filterOpt}
      id="free-solo-dialog-demo"
      options={Array.from(list).map(c => c[1])}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      selectOnFocus={true}
      clearOnBlur={true}
      blurOnSelect={true}
      clearOnEscape={true}
      disableCloseOnSelect={false}
      handleHomeEndKeys
      renderOption={(option) => option.title}
      renderInput={(params) => (
        <TextField
          style={{outline: 'none'}}
          {...params}
          variant="outlined"
          fullWidth placeholder="Search"/>
      )}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      {searchList.length > 0 && searchComponent}
    </ThemeProvider>
  );
};

SearchField.propTypes = {
  history: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  toggleSearchBarOpen: PropTypes.func.isRequired
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.plainList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSearchBarOpen: isOpen => dispatch(toggleSearchBarOpen(isOpen))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(SearchField)));
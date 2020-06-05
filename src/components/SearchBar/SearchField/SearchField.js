import React, {useState} from 'react';
import {TextField, ThemeProvider} from '@material-ui/core';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';

import useStyles from './SearchFieldStyle';
import theme from './SearchFieldTheme';

const top100Films = [
  {
    title: 'The Shawshank Redemption',
    year: 1994
  },
  {
    title: 'The Godfather',
    year: 1972
  },
  {
    title: 'The Godfather: Part II',
    year: 1974
  },
  {
    title: 'The Dark Knight',
    year: 2008
  },
  {
    title: '12 Angry Men',
    year: 1957
  },
  {
    title: 'Schindler\'s FooterList',
    year: 1993
  },
  {
    title: 'Pulp Fiction',
    year: 1994
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  {
    title: 'The Good, the Bad and the Ugly',
    year: 1966
  },
  {
    title: 'Fight Club',
    year: 1999
  }
];

const filter = createFilterOptions();

const SearchField = () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const filterOpt = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`
      });
    }

    return filtered;
  };
  const changeOn = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        value={value}
        style={{
          width: '100%',
          outline: 'none'
        }}
        classes={classes}
        onChange={changeOn}
        filterOptions={filterOpt}
        id="free-solo-dialog-demo"
        options={top100Films}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.title}
        freeSolo
        renderInput={(params) => (
          <TextField
            style={{outline: 'none'}}
            {...params}
            variant="outlined"
            fullWidth placeholder="Search"/>
        )}
      />
    </ThemeProvider>
  );
};

export default React.memo(SearchField);
import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
  inputRoot: {
    height: '38px',
    padding: '1px 30px 0 20px !important',
    border: 'none',
    borderRadius: '19px/50%',
    fontSize: '1rem',
    color: '#000',
    backgroundColor: ' #fff',
    [theme.breakpoints.between(0, 725)]: {
      display: 'none'
    }
  }
}));

const Search = () => {
  const [value, setValue] = React.useState(null);

  const classes = useStyles();

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
    <>
      <Autocomplete
        value={value}
        style={{ width: '100%' }}
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
          <TextField {...params} variant="outlined" fullWidth placeholder="Search"/>
        )}
      />

    </>
  );
};

export default React.memo(Search);

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: 'Schindler\'s FooterList', year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 }
];
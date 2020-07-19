import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Field} from 'formik';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import PublicIcon from '@material-ui/icons/Public';
import IconLabel from '../IconLabel/IconLabel';
import theme from '../../styles/formStyle/formStyleTheme';
import useStyles from '../../styles/formStyle/formStyle';
import {ThemeProvider} from '@material-ui/core';

function loadScript (src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const AutocompleteComponent = (props) => {
  const {error, touched, name, onBlur, className, value, setFieldValue} = props;
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDYssG7yXgX5iZEwiG4H7hPGdydSyliRiI&libraries=places',
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value && value.length) {
          newOptions = [value];
        }

        if (results && newOptions.length) {
          newOptions = [...newOptions, ...results];
        } else if (results) {
          newOptions = [...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleChange = useCallback((event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    if (newValue && typeof newValue === 'string') {
      setFieldValue('autocomplete', newValue);
    } else if (newValue) {
      setFieldValue('autocomplete', newValue.description);
    }
  }, [options, setFieldValue]);

  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        id='googleMap'
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        getOptionSelected={(option, value) => {
          if (value.length) {
            option = typeof option === 'string' ? option : option.description;
            return option === value;
          }
        }}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        className={className}
        includeInputInList
        filterSelectedOptions
        size='small'
        value={value}
        onChange={handleChange}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => {
          return (
            <Field {...params}
              component={TextField}
              name={name}
              label={<IconLabel label='city and street name *' Component={PublicIcon}/>}
              variant='outlined'
              value={value}
              onBlur={onBlur}
              helperText={touched.autocomplete ? error.autocomplete : ''}
              error={touched.autocomplete && Boolean(error.autocomplete)}
              fullWidth />
          );
        }}
        renderOption={(option) => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );
          return (
            <Grid container alignItems='center'>
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}

                <Typography variant='body2' color='textSecondary'>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </ThemeProvider>
  );
};

AutocompleteComponent.propTypes = {
  error: PropTypes.object,
  touched: PropTypes.object,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  setAddress: PropTypes.func,
  address: PropTypes.any
};

export default React.memo(AutocompleteComponent);
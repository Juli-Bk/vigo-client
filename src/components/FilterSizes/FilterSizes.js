import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ThemeProvider, makeStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import AjaxUtils from '../../ajax';
import theme from '../FilterColors/FilterColorsTheme';
import { setChosenSize } from '../../redux/actions/actions';

const useStyles = makeStyles(theme => {
  return {
    label: {
      fontSize: '1.1rem',
      textTransform: 'uppercase'
    }
  };
});

const FilterSizes = (props) => {
  const { categories, location, setChosenSize } = props;
  const classes = useStyles();
  const [state, setState] = useState({});
  const [sizes, setSizes] = useState([]);
  const [sizeNames, setSizeNames] = useState([]);
  let renderOption = 'all';

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
    AjaxUtils.Sizes.getAllSizes()
      .then(result => {
        setSizes(result.items);

        const namesSet = new Set();
        result.items.forEach(size => {
          namesSet.add(size.name);
        });
        setSizeNames(Array.from(namesSet));
        });
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLabelNames = useCallback((renderOption) => {
    const labelNames = new Set();
    if (renderOption !== 'all') {
      if (renderOption === 'accessories') {
        const accessories = categories.plainList.filter(category => category.parentId && category.parentId.name === renderOption);
        sizes.forEach(size => {
          if (accessories.find(object => object.name === size.sizeType)) labelNames.add(size.name);
        });
        labelNames.add('one size');
      } else {
        sizes.forEach(size => {
          if (size.sizeType === renderOption) labelNames.add(size.name);
        });
      }
    } else {
      sizeNames.sort(function (a, b) {
        return a - b;
      }).forEach(name => labelNames.add(name));
    }
    return labelNames;
  }, [sizes, sizeNames, categories]);

  const searchString = location.search.split('?')[1];

  if (searchString.includes('categoryId')) {
    const id = searchString.split('categoryId=')[1].split('&')[0];
    const category = categories.plainList.find(category => category._id === id);
    if (category.level > 1) {
      if (category.level === 2 || category.name === 'accessories') {
        renderOption = category.name;
      } else {
        renderOption = category.parentId.name;
      }
    }
  }

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
    setChosenSize(event.target.name);
  };

  const checkboxes = () => {
    const labelNames = Array.from(getLabelNames(renderOption));
    return labelNames.map(name => {
      return <FormControlLabel
        className={classes.label}
        key={name}
        label={name}
        control={<Checkbox
          onChange={handleChange}
          name={name}
          color='default'/>}/>;
    });
  };

  return (<ThemeProvider theme={theme}>
    {checkboxes()}
  </ThemeProvider>);
};

FilterSizes.propTypes = {
  categories: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setChosenSize: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    categories: store.categories,
    categoryId: store.categoryId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenSize: size => dispatch(setChosenSize(size))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterSizes)));
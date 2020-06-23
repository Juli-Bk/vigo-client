import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ThemeProvider, Checkbox, FormControlLabel } from '@material-ui/core';
import theme from '../FilterColors/FilterColorsTheme';
import { setChosenSize } from '../../../redux/actions/sizes';
import globalConfig from '../../../globalConfig';

const FilterSizes = (props) => {
  const { categories, location, setChosenSize, allSizes } = props;
  const [state, setState] = useState({});
  let renderOption = globalConfig.sizeRenderOptions.ALL;

  const getLabelNames = useCallback((renderOption) => {
    const labelNames = new Set();
    if (renderOption !== globalConfig.sizeRenderOptions.ALL) {
      if (renderOption === globalConfig.sizeRenderOptions.ACCESSORIES) {
        const accessories = categories.plainList && categories.plainList.filter(category => category.parentId && category.parentId.name === renderOption);
        allSizes.items.forEach(size => {
          if (accessories.find(object => object.name === size.sizeType)) labelNames.add(size.name);
        });
        labelNames.add('one size');
      } else {
        allSizes.items.forEach(size => {
          if (size.sizeType === renderOption) labelNames.add(size.name);
        });
      }
    } else {
      allSizes.names.sort((a, b) => {
        return a - b;
      }).forEach(name => labelNames.add(name));
    }
    return labelNames;
  }, [allSizes, categories]);

  const searchString = location.search.split('?')[1];

  if (searchString.includes('categoryId')) {
    const id = searchString.split('categoryId=')[1].split('&')[0];
    const category = categories.plainList.find(category => category._id === id);
    if (category.level > 1) {
      if (category.level === 2 || category.name === globalConfig.sizeRenderOptions.ACCESSORIES) {
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
  setChosenSize: PropTypes.func.isRequired,
  allSizes: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    categories: store.categories,
    categoryId: store.categoryId,
    allSizes: store.allSizes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChosenSize: size => dispatch(setChosenSize(size))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterSizes)));
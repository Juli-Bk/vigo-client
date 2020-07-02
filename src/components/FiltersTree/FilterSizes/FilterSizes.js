import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { ThemeProvider, Checkbox, FormControlLabel, Box } from '@material-ui/core';
import theme from '../FilterColors/FilterColorsTheme';
import { getAllSizes } from '../../../redux/actions/sizes';
import globalConfig from '../../../globalConfig';
import { getFilterString, getSizesState, getUrlData } from '../../../helpers/helpers';

const FilterSizes = (props) => {
  const { categories, location, allSizes, getAllSizes, history } = props;
  const parsed = useMemo(() => queryString.parse(location.search), [location.search]);
  const dataFromSearchString = useMemo(() => getUrlData(parsed, 'size'), [parsed]);
  const state = useCallback(() => {
    if (allSizes.names && allSizes.names.length) {
      getSizesState(allSizes.names, dataFromSearchString);
    }
  }, [dataFromSearchString, allSizes.names]);

  let renderOption = globalConfig.sizeRenderOptions.ALL;

  useEffect(() => {
    let isCanceled = false;

    if (!isCanceled) {
      getAllSizes();
    }
    return () => {
      isCanceled = true;
    };
  }, [getAllSizes]);

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

  if (parsed.categoryId) {
    const id = parsed.categoryId;
    const category = categories.plainList && categories.plainList.find(category => category._id === id);
    if (category.level > 1) {
      if (category.level === 2 || category.name === globalConfig.sizeRenderOptions.ACCESSORIES) {
        renderOption = category.name;
      } else {
        renderOption = category.parentId.name;
      }
    }
  }

  const handleChange = (event) => {
    const updatedParsed = getFilterString(parsed, 'size', event.target.name);
    const updatedSearch = queryString.stringify(updatedParsed);
    history.push(`/products/filter?${updatedSearch}`);
  };

  const getCheckboxes = () => {
    const labelNames = Array.from(getLabelNames(renderOption));
    return labelNames.map(name => {
      return <FormControlLabel
        key={name}
        label={name}
        checked={state[name]}
        control={<Checkbox
          onChange={handleChange}
          name={name}
          color='default'/>}/>;
    });
  };
  // hack to avoid material-ui warning with empty ThemeProvider children
  return (
    <ThemeProvider theme={theme}>
      {allSizes.names && allSizes.names.length > 0 ? getCheckboxes() : <Box/>}
    </ThemeProvider>);
};

FilterSizes.propTypes = {
  categories: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getAllSizes: PropTypes.func.isRequired,
  allSizes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    categories: store.categories,
    allSizes: store.allSizes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSizes: () => dispatch(getAllSizes())
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterSizes)));
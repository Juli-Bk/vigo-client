import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import AjaxUtils from '../../ajax';
import theme from '../CategoryTree/CategoryTreeTheme';

const FilterSizes = (props) => {
  const [sizes, setSizes] = useState([]);
  const [sizeTypes, setSizeTypes] = useState([]);

  const sizesTree = {};
  sizeTypes.length && sizeTypes.map(type => {
    return sizesTree[type] = sizes.filter(obj => obj.sizeType === type);
  });
  console.log(sizesTree);

  useEffect(() => {
    AjaxUtils.Sizes.getAllSizes()
      .then(result => {
        setSizes(result.items);

        const sizesSet = new Set();
        result.items.forEach(size => {
          sizesSet.add(size.sizeType);
        });
        setSizeTypes(Array.from(sizesSet));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<ThemeProvider theme={theme}><h2>Filters</h2></ThemeProvider>);
};

export default React.memo(connect()(FilterSizes));
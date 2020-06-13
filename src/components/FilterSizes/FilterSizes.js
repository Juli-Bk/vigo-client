import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../ajax';
import theme from '../CategoryTree/CategoryTreeTheme';

const FilterSizes = (props) => {
  const [sizes, setSizes] = useState([]);
  const [sizeTypes, setSizeTypes] = useState([]);

  useEffect(() => {
    AjaxUtils.Sizes.getAllSizes()
      .then(result => {
        console.log(result);
        setSizes(result.items);

        const sizesSet = new Set();
        result.items.forEach(size => {
          sizesSet.add(size.sizeType);
        });

        setSizeTypes(Array.from(sizesSet));
        const sizesTree = {};
        sizeTypes.map(type => {
          sizesTree[type] = [];
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (<ThemeProvider theme={theme}><h2>Filters</h2></ThemeProvider>);
};

export default React.memo(connect()(FilterSizes));
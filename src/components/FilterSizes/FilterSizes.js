import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ThemeProvider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AjaxUtils from '../../ajax';
import theme from '../CategoryTree/CategoryTreeTheme';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';

const FilterSizes = (props) => {
  const { categories, categoryId, location } = props;
  const [sizes, setSizes] = useState([]);
  const [sizeTypes, setSizeTypes] = useState([]);
  let renderOption = 'all';

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
  }, [categoryId, location, categories]);

  const sizesTree = {};
  sizeTypes.length && sizeTypes.map(type => {
    return sizesTree[type] = sizes.filter(obj => obj.sizeType === type);
  });

  const searchString = location.search.split('?')[1];

  if (searchString.includes('categoryId')) {
    const id = searchString.split('categoryId=')[1].split('&')[0];
    const category = categories.plainList.find(category => category._id === id);
    const breadCrumbs = category.categoryBreadcrumbs.split('/');
    if (category.parentId !== null) {
      if (breadCrumbs.length === 3) {
        renderOption = category.name;
      } else if (breadCrumbs.includes('accessories') && category.name !== 'accessories') {
        renderOption = category.name;
      } else {
        renderOption = category.parentId.name;
      }
    }
  }
  console.log('render option', renderOption);

  const getStyledTreeItem = useCallback((sizeType) => {
    let children = [];
    if (sizeType.children.length) {
      children = sizeType.children.map(child => {
        return getStyledTreeItem(child);
      });
    }

    return <StyledTreeItem
      key={sizeType}
      nodeId={sizeType}
      label={sizeType}
      onLabelClick={(event) => {
        // history.push(`/products/filter?categoryId=${category.id}`);
        console.log('chosen seze type is', sizeType);
      }}
    >
      {children}
    </StyledTreeItem>;
  },
  []);

  return (<ThemeProvider theme={theme}>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      <TreeItem nodeId="1" label="Accessories">
        <TreeItem nodeId="2" label="Belts">
          <FormControlLabel
            key='belt1'
            label='belt1'
            control={<Checkbox
            // onChange={handleChange}
              name='belt1'
              color='default'/>}/>
          <FormControlLabel
            key='belt3'
            label='belt3'
            control={<Checkbox
            // onChange={handleChange}
              name='belt3'
              color='default'/>}/>
        </TreeItem>
        <TreeItem nodeId="3" label="Hats" />
        <TreeItem nodeId="4" label="Scarves" />
        <TreeItem nodeId="10" label="Bags" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  </ThemeProvider>);
};

const mapStateToProps = store => {
  return {
    categories: store.categories,
    categoryId: store.categoryId
  };
};

export default React.memo(connect(mapStateToProps)(withRouter(FilterSizes)));
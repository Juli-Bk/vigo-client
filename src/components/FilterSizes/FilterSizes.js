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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';
import { setChosenSize } from '../../redux/actions/actions';

const FilterSizes = (props) => {
  const { categories, categoryId, location, setChosenSize } = props;
  const [state, setState] = useState({});
  const [sizes, setSizes] = useState([]);
  const [sizeTypes, setSizeTypes] = useState([]);
  const sizesTree = {
    accessories: {}
  };
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
  const searchString = location.search.split('?')[1];

  if (searchString.includes('categoryId')) {
    const id = searchString.split('categoryId=')[1].split('&')[0];
    const category = categories.plainList.find(category => category._id === id);
    const breadCrumbs = category.categoryBreadcrumbs.split('/');
    if (category.parentId !== null) {
      if (breadCrumbs.length === 3) {
        renderOption = category.name;
      } else {
        renderOption = category.parentId.name;
      }
    }
  }
  // console.log('render option', renderOption);

  sizeTypes.length && sizeTypes.map(type => {
    if (type === 'clothing' || type === 'shoes' || type === 'one size') {
      return sizesTree[type] = sizes.filter(obj => obj.sizeType === type);
    } else {
      return sizesTree.accessories[type] = sizes.filter(obj => obj.sizeType === type);
    }
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
    setChosenSize(event.target.name);
  };

  const sizesArray = Object.entries(sizesTree);

  const getStyledTreeItem = useCallback((treeItem, checkboxesLabels) => {
    if (treeItem) console.log(treeItem);
    return <StyledTreeItem
      key={treeItem}
      nodeId={treeItem}
      label={treeItem}
      onLabelClick={(event) => {
        // history.push(`/products/filter?categoryId=${category.id}`);
        // console.log('chosen size type is', sizeType);
      }}>
      {checkboxesLabels.map(label => {
        return <FormControlLabel
          // className={classes.label}
          key={label}
          label={label}
          control={<Checkbox
            onChange={handleChange}
            name={label}
            color='default'/>}/>;
      })}
    </StyledTreeItem>;
  },
  []);

  const tree = sizesArray.map(array => {
    const itemLabel = array[0];
    let checkboxesLabels = [];
    if (Array.isArray(array[1])) {
      array[1].forEach(obj => {
        checkboxesLabels.push(obj.name);
      });
    } else {
      const checkboxesSet = new Set();
      const accessoriesArray = Object.entries(array[1]);
      if (Array.isArray(accessoriesArray) && accessoriesArray.length) {
        accessoriesArray.forEach(array => {
          array[1].forEach(obj => {
            checkboxesSet.add(obj.name);
          });
        });
      }
      checkboxesLabels = Array.from(checkboxesSet);
    }
    return getStyledTreeItem(itemLabel, checkboxesLabels);
  });
  console.log('tree', tree);

  return (<ThemeProvider theme={theme}>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      {tree}
    </TreeView>
  </ThemeProvider>);
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
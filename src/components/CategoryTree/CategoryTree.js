import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TreeView from '@material-ui/lab/TreeView';
import useStyles from './CategoryTreeStyle';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';
import FilterColorsTreeItem from '../FilterColors/FilterColorsTreeItem';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import FilterColors from '../FilterColors/FilterColors';

const CategoryTree = (props) => {
  const {categories, history} = props;
  const classes = useStyles();

  const getStyledTreeItem = useCallback((category) => {
    let children = [];
    if (category.children.length) {
      children = category.children.map(child => {
        return getStyledTreeItem(child);
      });
    }

    return <StyledTreeItem
      key={`${category.id}`}
      nodeId={`${category.id}`}
      className={classes[category.level.toString()]}
      label={`${category.name}`}
      onLabelClick={(event) => {
        history.push(`/products/filter?categoryId=${category.id}`);
      }}
    >
      {children}
    </StyledTreeItem>;
  },
  [classes, history]);

  const elementsToExpand = useMemo(() => {
    const arr = categories
      .filter(category => category.level === 1)
      .map(item => item.id.toString());
    arr.push('categoriesRoot');
    return arr;
  }, [categories]);

  const categoriesTree = useMemo(() => categories.map(category => {
    return getStyledTreeItem(category);
  }), [categories, getStyledTreeItem]);

  const tree = elementsToExpand.length > 1
    ? <TreeView
      className={classes.root}
      defaultExpanded={elementsToExpand}
      defaultCollapseIcon={<RemoveIcon className={classes.iconHover}/>}
      defaultExpandIcon={<AddIcon className={classes.iconHover}/>}
    >
      <StyledTreeItem
        key={'categoriesRoot'}
        nodeId={'categoriesRoot'}
        className={classes['0']}
        label={'Categories'}>
        {categoriesTree}
      </StyledTreeItem>
      <FilterColorsTreeItem
        key={'colorsRoot'}
        nodeId={'colorsRoot'}
        className={classes['0']}
        label={'Filters'}>
        <FilterColors/>
      </FilterColorsTreeItem>
    </TreeView>
    : <></>;

  return (
    tree
  );
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.categories
  };
};

export default connect(mapStoreToProps)(React.memo(withRouter(CategoryTree)));
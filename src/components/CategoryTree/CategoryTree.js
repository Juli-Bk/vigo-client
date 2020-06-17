import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import TreeView from '@material-ui/lab/TreeView';
import useStyles from './CategoryTreeStyle';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';
import FilterColorsTreeItem from '../FilterColors/FilterColorsTreeItem';
import {setCategoryId} from '../../redux/actions/actions';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import FilterColors from '../FilterColors/FilterColors';
import FilterSizes from '../FilterSizes/FilterSizes';

const CategoryTree = (props) => {
  const {categories, history, setCategoryId} = props;
  const classes = useStyles();

  const getStyledTreeItem = useCallback((category) => {
    let categoryChildren = [];
    const { children, id, level, name } = category;
    if (children.length) {
      categoryChildren = children.map(child => {
        return getStyledTreeItem(child);
      });
    }

    return <StyledTreeItem
      key={`${id}`}
      nodeId={`${id}`}
      className={classes[level.toString()]}
      label={`${name}`}
      onLabelClick={(event) => {
        history.push(`/products/filter?categoryId=${category.id}`);
        setCategoryId(category.id);
      }}
    >
      {categoryChildren}
    </StyledTreeItem>;
  },
  [classes, history]);

  const elementsToExpand = useMemo(() => {
    const arr = categories
      .filter(category => category.level && category.level === 1)
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
        label={'Color Filter'}>
        <FilterColors/>
      </FilterColorsTreeItem>
      <FilterColorsTreeItem
        key={'sizesRoot'}
        nodeId={'sizesRoot'}
        className={classes['0']}
        label={'Size Filter'}>
        <FilterSizes categories={categories}/>
      </FilterColorsTreeItem>
    </TreeView>
    : <></>;

  return (
    tree
  );
};

CategoryTree.propTypes = {
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCategoryId: categoryId => dispatch(setCategoryId(categoryId))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(CategoryTree)));
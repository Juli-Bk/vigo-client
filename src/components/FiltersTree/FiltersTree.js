import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import TreeView from '@material-ui/lab/TreeView';
import useStyles from './FiltersTreeStyle';
import StyledTreeItem from '../StyledTreeItem/StyledTreeItem';
import FilterColorsTreeItem from './FilterColors/FilterColorsTreeItem';
import FilterSizesTreeItem from './FilterSizes/FilterSizesTreeItem';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import FilterColors from './FilterColors/FilterColors';
import FilterSizes from './FilterSizes/FilterSizes';
import FilterCategory from './FilterCategory/FilterCategory';

const FiltersTree = (props) => {
  const {categories} = props;
  const classes = useStyles();

  const elementsToExpand = useMemo(() => {
    const arr = categories
      .filter(category => category.level && category.level === 1)
      .map(item => item.id.toString());
    arr.push('categoriesRoot');
    return arr;
  }, [categories]);

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
        <FilterCategory/>
      </StyledTreeItem>
      <FilterColorsTreeItem
        key={'colorsRoot'}
        nodeId={'colorsRoot'}
        className={classes['0']}
        label={'Color Filter'}>
        <FilterColors/>
      </FilterColorsTreeItem>
      <FilterSizesTreeItem
        key={'sizesRoot'}
        nodeId={'sizesRoot'}
        className={classes['0']}
        label={'Size Filter'}>
        <FilterSizes categories={categories}/>
      </FilterSizesTreeItem>
    </TreeView>
    : <></>;

  return (
    tree
  );
};

FiltersTree.propTypes = {
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.categories
  };
};

export default connect(mapStoreToProps)(React.memo(withRouter(FiltersTree)));
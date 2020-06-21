import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import useStyles from '../FiltersTreeStyle';
import StyledTreeItem from '../../StyledTreeItem/StyledTreeItem';
import {setCategoryId} from '../../../redux/actions/categories';

import theme from '../FilterColors/FilterColorsTheme';
import { ThemeProvider } from '@material-ui/core';

const FiltersCategory = (props) => {
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
  [classes, history, setCategoryId]);

  const categoriesTree = useMemo(() => categories.map(category => {
    return getStyledTreeItem(category);
  }), [categories, getStyledTreeItem]);

  return (
    <ThemeProvider theme={theme}>
      {categoriesTree}
    </ThemeProvider>
  );
};

FiltersCategory.propTypes = {
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
    setCategoryId: id => dispatch(setCategoryId(id))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(FiltersCategory)));
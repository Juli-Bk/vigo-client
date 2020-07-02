import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import useStyles from '../FiltersTreeStyle';
import StyledTreeItem from '../../StyledTreeItem/StyledTreeItem';
import queryString from 'query-string';

import theme from '../FilterColors/FilterColorsTheme';
import {ThemeProvider} from '@material-ui/core';
import {setCurrentPage} from '../../../redux/actions/actions';

const FiltersCategory = (props) => {
  const {categories, history, setCurrentPage} = props;
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
      onLabelClick={() => {
        const searchString = queryString.stringify({categoryId: category.id});
        history.push(`/products/filter?${searchString}`);
        setCurrentPage(1);
      }}
    >
      {categoryChildren}
    </StyledTreeItem>;
  },
  [classes, history, setCurrentPage]);

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
    setCurrentPage: number => dispatch(setCurrentPage(number))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(withRouter(FiltersCategory)));
import React, {useEffect, useCallback} from 'react';
import {Container, Grid, useMediaQuery} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import useStyles from './ProductsStyles';
import globalConfig from '../../globalConfig';
import {defineSortData, getFiltersArray, getCategoryId} from '../../helpers/helpers';

import ProductGrid from '../../containers/ProductsGrid/ProductsGrid';
import ProductsList from '../../containers/ProductsList/ProductsList';
import PaginationRounded from '../../components/Pagination/Pagination';
import SideBar from '../../components/SideBar/SideBar';
import ShowBy from '../../components/ShowBy/ShowBy';
import Sort from '../../components/Sort/Sort';
import FilterPrice from '../../components/FilterPrice/FilterPrice';
import ViewAs from '../../components/ViewAs/ViewAs';
import EmptyState from '../../components/EmptyState/EmptyState';
import {getProductsByFilters} from '../../redux/actions/products';
import { setCategoryId } from '../../redux/actions/categories';

const Products = (props) => {
  const {
    currentPage,
    perPage,
    sortingOption,
    view,
    location,
    getProductsByFilters,
    products,
    filters,
    setCategoryId
  } = props;
  const isSmScreen = useMediaQuery('(max-width: 723px)');
  const classes = useStyles();
  const searchString = location.search.split('?')[1];

  const getFilteredData = useCallback(() => {
    const sort = defineSortData(sortingOption);
    const filtersArray = getFiltersArray(filters);
    getProductsByFilters(filtersArray, currentPage, perPage, sort);
  }, [currentPage, filters, getProductsByFilters, perPage, sortingOption]);

  useEffect(() => {
    let isCanceled = false;

    if (!isCanceled) {
      if (!filters.categoryId.length) {
        const categoryId = getCategoryId(searchString);
        setCategoryId(categoryId);
      }
      getFilteredData();

      // todo url string with all filters
      // history.replace(`/products/filter?categoryId=${categoryId}&${getFilterString(filtersArray, defineSortData(sortingOption))}`);
    }
    return () => {
      isCanceled = true;
    };
  }, [currentPage, perPage, sortingOption, filters, getFilteredData, searchString, setCategoryId]);

  return (
    <Container>
      <Grid container>
        <Grid item container sm={8} xs={12}>
          <Container>
            <Grid item xs={12} className={classes.topFiltersLine}>
              <Grid item container xs={12} className={classes.upperLine}>
                {!isSmScreen
                  ? <Grid container item lg={6} md={5} sm={6} xs={12} className={classes.sortSelect}>
                    <Sort values={globalConfig.sortOptions}/>
                  </Grid>
                  : null
                }
                <Grid item lg={6} md={7} sm={6} xs={12} className={classes.filterPrice}>
                  <FilterPrice/>
                </Grid>
              </Grid>
              {isSmScreen ? <Grid container item sm={6} xs={12} className={classes.sortSelect}>
                <Sort values={globalConfig.sortOptions}/>
              </Grid>
                : null}
              <Grid item container lg={12} spacing={0}>
                <Grid item md={3} xs={6} className={classes.viewBox}>
                  <ViewAs label={true}/>
                </Grid>
                <Grid item md={3} xs={6} className={classes.showBy}>
                  {products.totalCount > globalConfig.step ? <ShowBy step={globalConfig.step}/> : null}
                </Grid>
                <Grid item md={6} xs={12}>
                  {products.totalCount > 0
                    ? <PaginationRounded perPage={perPage} total={products.totalCount}/>
                    : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container className={classes.products} xs={12}>
              {products.data && products.data.length
                ? (view === 'module' ? <ProductGrid products={products.data}/>
                  : <ProductsList products={products.data}/>)
                : <EmptyState text={globalConfig.userMessages.EMPTY_RESULT}/>}
            </Grid>
          </Container>
        </Grid>
        <Grid item sm={4}>
          <SideBar/>
        </Grid>
        <Grid item xs={12} className={classes.paginationBottom}>
          {products.totalCount > 0
            ? <PaginationRounded perPage={perPage} total={products.totalCount}/>
            : null}
        </Grid>
      </Grid>
    </Container>
  );
};

Products.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  sortingOption: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  getProductsByFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = store => {
  return {
    currentPage: store.currentPage,
    perPage: store.productsPerPage,
    sortingOption: store.sortingOption,
    view: store.view,
    products: store.products,
    filters: store.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    setCategoryId: id => dispatch(setCategoryId(id))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(Products)));
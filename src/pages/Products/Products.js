import React, { useEffect, useCallback, useMemo } from 'react';
import {Container, Grid, useMediaQuery} from '@material-ui/core';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import useStyles from './ProductsStyles';
import globalConfig from '../../globalConfig';
import {defineSortData, getFiltersArray, deleteProps} from '../../helpers/helpers';
import queryString from 'query-string';

import ProductGrid from '../../containers/ProductsGrid/ProductsGrid';
import ProductsList from '../../containers/ProductsList/ProductsList';
import PaginationRounded from '../../components/Pagination/Pagination';
import SideBar from '../../components/SideBar/SideBar';
import ShowBy from '../../components/ShowBy/ShowBy';
import Sort from '../../components/Sort/Sort';
import ViewAs from '../../components/ViewAs/ViewAs';
import EmptyState from '../../components/EmptyState/EmptyState';
import {getProductsByFilters, searchProducts, getAllProducts} from '../../redux/actions/products';
import { setCurrentPage } from '../../redux/actions/actions';

const Products = (props) => {
  const {
    currentPage,
    setCurrentPage,
    view,
    location,
    getProductsByFilters,
    getProductsBySearch,
    getAllProducts,
    products
  } = props;

  const classes = useStyles();
  const isSmScreen = useMediaQuery('(max-width: 723px)');
  const filters = useMemo(() => queryString.parse(location.search), [location.search]);
  const sort = useMemo(() => filters.sort || defineSortData(globalConfig.sortOptions.New_In),
    [filters.sort]);
  const perPage = useMemo(() => Number(filters.perPage) || globalConfig.step,
    [filters.perPage]);

  const getFilteredData = useCallback(() => {
    if (filters.startPage) {
      setCurrentPage(Number(filters.startPage));
    }
    const updatedFilters = deleteProps(filters, ['sort', 'startPage', 'perPage']);
    const filtersArray = getFiltersArray(updatedFilters);
    getProductsByFilters(filtersArray, currentPage, perPage, sort);
  }, [currentPage, filters, getProductsByFilters, perPage, setCurrentPage, sort]);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      if (location.pathname === '/products') {
        getAllProducts(currentPage, perPage, sort);
      }
      const pathName = location.pathname.split('/');

      if (pathName.includes('search')) {
        const indexOfSearchStr = pathName.indexOf('search') + 1;
        const searchStr = pathName[indexOfSearchStr];
        getProductsBySearch(searchStr);
      } else {
        getFilteredData();
      }
    }
    return () => {
      isCanceled = true;
    };
  }, [currentPage, filters, getAllProducts, getFilteredData, getProductsBySearch, location.pathname, perPage, sort]);

  return (
    <Container>
      <Grid container>
        <Grid item container sm={8} xs={12}>
          <Container className={classes.itemsContainer}>
            <Grid item xs={12} className={classes.topFiltersLine}>
              <Grid item container xs={12} className={classes.upperLine}>
                <Grid item xs={8} sm={5} md={6} className={classes.sortSelect}>
                  <Sort values={globalConfig.sortOptions}/>
                </Grid>
                {!isSmScreen ? <Grid item md={3} className={classes.viewBox}>
                  <ViewAs label={true}/>
                </Grid> : null}
                <Grid item md={3} xs={4} className={classes.showBy}>
                  {products.totalCount > globalConfig.step ? <ShowBy step={globalConfig.step}/> : null}
                </Grid>
              </Grid>
              <Grid item container spacing={0} justify='center' alignItems='center'>
                {isSmScreen
                  ? <Grid item xs={12} className={classes.viewBox}>
                    <ViewAs label={true}/>
                  </Grid> : null
                }
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
            <Grid item xs={12} className={classes.paginationBottom}>
              {products.totalCount > 0
                ? <PaginationRounded perPage={perPage} total={products.totalCount}/>
                : null}
            </Grid>
          </Container>
        </Grid>
        <Grid item sm={4}>
          <SideBar/>
        </Grid>
      </Grid>
    </Container>
  );
};

Products.propTypes = {
  view: PropTypes.string.isRequired,
  getProductsByFilters: PropTypes.func.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getProductsBySearch: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    view: store.view,
    products: store.products,
    currentPage: store.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    },
    setCurrentPage: number => dispatch(setCurrentPage(number)),
    getProductsBySearch: string => dispatch(searchProducts(string)),
    getAllProducts: (startPage, perPage, sort) => dispatch(getAllProducts(startPage, perPage, sort))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withRouter(Products)));
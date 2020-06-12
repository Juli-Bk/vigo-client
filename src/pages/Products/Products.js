import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AjaxUtils from '../../ajax';
import useStyles from './ProductsStyles';
import globalConfig from '../../globalConfig';
import { defineSortData, makeFilterItem } from '../../helpers/helpers';

import ProductGrid from '../../containers/ProductsGrid/ProductsGrid';
import ProductsList from '../../containers/ProductsList/ProductsList';
import PaginationRounded from '../../components/Pagination/Pagination';
import SideBar from '../../components/SideBar/SideBar';
import ShowBy from '../../components/ShowBy/ShowBy';
import Sort from '../../components/Sort/Sort';
import FilterPrice from '../../components/FilterPrice/FilterPrice';
import ViewAs from '../../components/ViewAs/ViewAs';

const Products = (props) => {
  const {currentPage, perPage, sortingOption, priceRange, view, colors} = props;
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [maxProductsPrice, setMaxProductsPrice] = useState(1000);

  const filtersArray = [{minPrice: priceRange[0]}, {maxPrice: priceRange[1]}];
  const href = window.location.href.split('filter?')[1];

  console.log('render');

  useEffect(() => {
    let isCanceled = false;

    if (href.includes('&')) {
      const filterStrings = href.split('&');
      const allFilters = [];
      filterStrings.forEach(string => {
        allFilters.push(makeFilterItem(string));
      });
      filtersArray.push(...allFilters);
    } else {
      filtersArray.push(makeFilterItem(href));
    }

    if (!isCanceled) {
      AjaxUtils.Products.getMaxPrice()
        .then(result => {
          setMaxProductsPrice(result.maxSalePrice);
        });
      AjaxUtils.Products.getProductsByFilters(filtersArray, currentPage, perPage, `${defineSortData(sortingOption)}`)
        .then(result => {
          setProducts(result.products);
          setTotal(result.totalCount);
        });
      // AjaxUtils.Quantity.getAllQuantity()
      //   .then(result => {
      //     console.log(result);
      //     colors.length && colors.forEach(color => {
      //       const items = result.items.filter(item => item.colorId._id === color);
      //       console.log(items);
      //     });
      //   });
    }
    return () => {
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, currentPage, perPage, sortingOption, priceRange, colors]);

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item container lg={8} xl={8} md={8} sm={8} xs={12} className={classes.grid}>
          <Grid item container className={classes.topFiltersLine}>
            <Grid item container lg={12} className={classes.upperLine}>
              <Grid container item xl={6} lg={6} md={5} sm={6} xs={12} className={classes.sortSelect}>
                <Sort values={globalConfig.sortOptions}/>
              </Grid>
              <Grid item xl={6} lg={6} md={7} sm={6} xs={12} className={classes.filterPrice}>
                <FilterPrice maxProductsPrice={maxProductsPrice}/>
              </Grid>
            </Grid>
            <Grid item container lg={12} spacing={2}>
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                <ViewAs label={true}/>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={6} xs={6} className={classes.showBy}>
                <ShowBy step={globalConfig.step}/>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <PaginationRounded perPage={perPage} total={total}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container className={classes.products} xl={12} lg={12} md={12} sm={12} xs={12}>
            {view === 'module' ? <ProductGrid products={products}/> : <ProductsList products={products}/>}
          </Grid>
        </Grid>
        <SideBar/>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.paginationBottom}>
          <PaginationRounded perPage={perPage} total={total}/>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    currentPage: store.currentPage,
    perPage: store.productsPerPage,
    sortingOption: store.sortingOption,
    priceRange: store.priceRange,
    view: store.view,
    colors: store.colors
  };
};

Products.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  sortingOption: PropTypes.string.isRequired,
  priceRange: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired
};

export default React.memo(connect(mapStateToProps)(Products));
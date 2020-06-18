import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Grid, makeStyles, withWidth} from '@material-ui/core';
import ProductGridView from '../../components/Product/ProductGridView/ProductGridView';
import LowerTitle from '../../components/LowerTitle/LowerTitle';
import DividerPlusBtn from '../../components/DividerAndPlusBtn/DividerAndPlusBtn';
import AjaxUtils from '../../ajax';
import {calculatePerPageParam} from '../../helpers/helpers';

const useStyles = makeStyles({
  container: {
    marginBottom: '3rem'
  }
});

const Bestsellers = (props) => {
  const classes = useStyles();
  const {width} = props;
  const [productsData, setProductsData] = useState([]);
  const [perPage, setPerPage] = useState(calculatePerPageParam(width));

  const startPage = 1;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      AjaxUtils.Products.getProductsByFilters([{bestseller: true}], startPage, perPage, '')
        .then(result => {
          const bestsellers = result && result.products ? result.products : [];
          setProductsData(bestsellers);
        });
    }
    return () => {
      isCanceled = true;
    };
  }, [perPage]);

  const showMore = () => {
    setPerPage(perPage + calculatePerPageParam(width));
  };

  const cards = productsData.map(product =>
    (<Grid item lg={4} md={4} sm={6} xs={12} key={product._id}>
      <ProductGridView
        key={product._id}
        productData={product}/>
    </Grid>)
  );

  return (
    <Grid container justify="center" spacing={2} className={classes.container}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <LowerTitle data-testid='section-title' text='Bestsellers'/>
      </Grid>
      {cards}
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <DividerPlusBtn handler={showMore}/>
      </Grid>
    </Grid>
  );
};

Bestsellers.propTypes = {
  width: PropTypes.string.isRequired
};

export default React.memo(withWidth()(Bestsellers));
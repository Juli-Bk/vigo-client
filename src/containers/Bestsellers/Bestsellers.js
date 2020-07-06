import React, { useCallback, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Grid, makeStyles, withWidth} from '@material-ui/core';
import ProductGridView from '../../components/Product/ProductGridView/ProductGridView';
import LowerTitle from '../../components/LowerTitle/LowerTitle';
import DividerPlusBtn from '../../components/DividerAndPlusBtn/DividerAndPlusBtn';
import {calculatePerPageParam} from '../../helpers/helpers';
import {getBestsellers} from '../../redux/actions/products';

const useStyles = makeStyles({
  container: {
    marginBottom: '3rem'
  }
});

const Bestsellers = (props) => {
  const classes = useStyles();
  const {width, bestSellers, getBestsellers} = props;
  const [perPage, setPerPage] = useState(calculatePerPageParam(width));

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getBestsellers(perPage);
    }
    return () => {
      isCanceled = true;
    };
  }, [getBestsellers, perPage]);

  const showMore = useCallback(() => {
    setPerPage(perPage + calculatePerPageParam(width));
  }, [perPage, width]);

  const cards = bestSellers.map(product =>
    (<Grid item md={4} sm={6} xs={12} key={product._id}>
      <ProductGridView
        key={product._id}
        productData={product}/>
    </Grid>)
  );

  return (
    <Grid container justify="center" spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <LowerTitle data-testid='section-title' text='Bestsellers'/>
      </Grid>
      {cards}
      <Grid item xs={12}>
        <DividerPlusBtn handler={showMore}/>
      </Grid>
    </Grid>
  );
};

Bestsellers.propTypes = {
  width: PropTypes.string.isRequired,
  bestSellers: PropTypes.array.isRequired,
  getBestsellers: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    bestSellers: store.products.bestSellers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBestsellers: (perPage) => dispatch(getBestsellers(perPage))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(Bestsellers)));
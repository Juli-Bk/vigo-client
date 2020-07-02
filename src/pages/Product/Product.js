import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Container, Grid, withWidth, makeStyles} from '@material-ui/core';
import AjaxUtils from '../../ajax';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductPageView from '../../components/Product/ProductPageView/ProductPageView';
import LowerTitle from '../../components/LowerTitle/LowerTitle';
import TabSlider from '../../components/TabsSliders/TabSlider';
import {getStorageData, setStorageData} from '../../helpers/helpers';
import globalConfig from '../../globalConfig';
import {getRecentlyViewed} from '../../redux/actions/products';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: '2rem'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '3rem'
    }
  }
}));

const Product = (props) => {
  const { id } = useParams();
  const classes = useStyles();
  const { width, recentlyViewed, getRecentlyViewed } = props;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let isCanceled = false;
    const dataFromStorage = getStorageData('recentlyViewed');

    if (!isCanceled) {
      AjaxUtils.Products.getProductById(id)
        .then(result => {
          setProduct(result);
        });
      getRecentlyViewed(id);
    }

    return () => {
      if (!dataFromStorage.find(item => item === id)) {
        dataFromStorage.length < globalConfig.maxRecentlyViewed
          ? setStorageData('recentlyViewed', [...dataFromStorage, id])
          : dataFromStorage.splice(0, 1);
        setStorageData('recentlyViewed', [...dataFromStorage, id]);
      }
      isCanceled = true;
    };
  }, [getRecentlyViewed, id]);

  return (
    <Container>
      <Grid container>
        <Grid item container
          spacing={4} xs={12}
          className={classes.container}>
          <Grid item xs={12} md={6} lg={5}>
            {product ? <ProductSlider product={product}/> : null}
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            {product ? <ProductPageView productData={product} /> : null}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {recentlyViewed && recentlyViewed.length
            ? <>
              <LowerTitle text='recently viewed'/>
              <TabSlider data={recentlyViewed} width={width}/>
            </>
            : null
          }
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = store => {
  return {
    recentlyViewed: store.products.recentlyViewed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecentlyViewed: (productId) => dispatch(getRecentlyViewed(productId))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(Product)));
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Grid, withWidth, makeStyles} from '@material-ui/core';
import AjaxUtils from '../../ajax';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductPageView from '../../components/Product/ProductPageView/ProductPageView';
import LowerTitle from '../../components/LowerTitle/LowerTitle';
import TabSlider from '../../components/TabsSliders/TabSlider';
import {changeOrder, getStorageData, setStorageData} from '../../helpers/helpers';
import globalConfig from '../../globalConfig';

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

// todo replace productQuantity to productPageView from real DB data

const Product = (props) => {
  const { id } = useParams();
  const classes = useStyles();
  const { width } = props;
  const [product, setProduct] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [productInStock, setProductInStock] = useState({});

  useEffect(() => {
    let isCanceled = false;
    const dataFromStorage = getStorageData('recentlyViewed');
    const filterArray = dataFromStorage.length ? [{_id: dataFromStorage}] : [];

    if (!isCanceled) {
      AjaxUtils.Products.getProductById(id)
        .then(result => {
          setProduct(result);
        });
      AjaxUtils.Quantity.getQuantityByProductId(id)
        .then(result => {
          setProductInStock(result);
        });
      if (filterArray.length) {
        AjaxUtils.Products.getProductsByFilters(filterArray, 1, 8, '')
          .then(result => {
            if ((result.products && result.products.length) < dataFromStorage.length) {
              setSliderData([]);
              setStorageData('recentlyViewed', [id]);
              return;
            }
            if (!result.message) {
              const data = changeOrder(dataFromStorage.filter(item => item !== id), result.products);
              if (data.length) setSliderData(data);
            } else {
              const message = result.message;
              let wrongId = '';
              if (message.includes('_id')) {
                wrongId = message.split('/')[1];
              }
              setStorageData('recentlyViewed', [...dataFromStorage.filter(item => item !== wrongId)]);
            }
          });
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Container>
      <Grid container>
        <Grid item container
          spacing={4} xs={12} sm={12} md={12} lg={12} xl={12}
          className={classes.container}>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {product ? <ProductSlider product={product}/> : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
            {product && productInStock ? <ProductPageView productData={product} productQuantity={productInStock} /> : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {sliderData && sliderData.length
            ? <>
              <LowerTitle text='recently viewed'/>
              <TabSlider data={sliderData} width={width}/>
            </>
            : null
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default React.memo(withWidth()(Product));
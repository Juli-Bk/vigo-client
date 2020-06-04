import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Grid, withWidth } from '@material-ui/core';
import AjaxUtils from '../../ajax';
import { setRecentlyViewed } from '../../redux/actions/actions';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import ProductPageView from '../../components/Product/ProductPageView/ProductPageView';
import LowerTitle from '../../components/LowerTitle/LowerTitle';
import TabSlider from '../../components/TabsSliders/TabSlider';
import { changeOrder, getStorageData, setStorageData } from '../../helpers/helpers';

// todo replace productQuantity to productPageView from real DB data

const Product = (props) => {
  const { id } = useParams();
  const { width, recentlyViewed, setRecentlyViewed } = props;

  const [product, setProduct] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const dataFromStorage = getStorageData('recentlyViewed');

  const filterArray = [{_id: 0}];
  if (Array.isArray(recentlyViewed) && recentlyViewed.length) {
    filterArray[0]._id = recentlyViewed;
  }

  useEffect(() => {
    let isCanceled = false;

    if (dataFromStorage.length && !recentlyViewed.length) {
      dataFromStorage.forEach(item => setRecentlyViewed(item));
    }
    if (!dataFromStorage.find(item => item === id)) {
      if (dataFromStorage.length < 8) {
        setStorageData('recentlyViewed', [...dataFromStorage, id]);
      } else {
        dataFromStorage.splice(0, 1);
        setStorageData('recentlyViewed', [...dataFromStorage, id]);
      }
    }

    if (!isCanceled) {
      AjaxUtils.Products.getProductById(id)
        .then(result => {
          setProduct(result);
        });
      if (recentlyViewed.length) {
        AjaxUtils.Products.getProductsByFilters(filterArray, 1, 8, '')
          .then(result => {
            setSliderData(changeOrder(recentlyViewed.filter(item => item !== id), result.products));
          });
      }
    }
    return () => {
      setRecentlyViewed(id);
      isCanceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentlyViewed]);

  return (
    <Container>
      <Grid container spacing={8}>
        <Grid item container spacing={4} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {product ? <ProductSlider product={product}/> : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
            {product ? <ProductPageView productData={product} productQuantity={5} /> : null}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {sliderData
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

const mapStateToProps = store => {
  return {
    recentlyViewed: store.recentlyViewed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRecentlyViewed: id => dispatch(setRecentlyViewed(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withWidth()(Product)));
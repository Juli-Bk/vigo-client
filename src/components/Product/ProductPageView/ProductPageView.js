import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Box, Divider, Link, ThemeProvider, Typography, withWidth} from '@material-ui/core';

import {
  capitalize,
  mapArrayToOptions,
  getMaxQuantity,
  getProductStockData,
  getColorName,
  getChosenSizeId,
  getSizesArray
} from '../../../helpers/helpers';
import {getProductsQuantity} from '../../../redux/actions/Quantity';
import {useStyles} from './ProductPageViewStyles';
import {theme} from './ProductPageViewTheme';
import {colors} from '../../../styles/colorKit';
import globalConfig from '../../../globalConfig';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';
import SelectSimple from '../../Select/SelectBox';
import Quantity from '../Quantity/Quantity';

const ProductPageView = (props) => {
  const classes = useStyles();

  const {productData, width, productsQuantity, getProductsQuantity} = props;
  const {name, description, price, rating, brandId, salePrice, productId, isOnSale, _id} = productData;

  const [chosenSize, setChosenSize] = useState('');
  const [quantity, setQuantity] = useState(globalConfig.defaultQuantityOption);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [productQuantity, setProductQuantity] = useState([]);

  const color = getColorName(productQuantity);
  const maxQuantity = getMaxQuantity(productQuantity, chosenSize);
  const sizeId = getChosenSizeId(productQuantity, chosenSize);
  const sizesArray = getSizesArray(productQuantity);

  useEffect(() => {
    getProductsQuantity([_id]);
    const quantityOfCurrentProduct = getProductStockData(productsQuantity, _id);
    setProductQuantity(quantityOfCurrentProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenSize, productsQuantity, productData, getProductsQuantity, getProductStockData]);

  const handleSetSize = (event) => {
    if (event.target.value !== globalConfig.defaultSizeOption) {
      setChosenSize(event.target.value);
      setDisplayHelper(false);
    }
  };

  const handleQuantity = (id, number) => {
    if (!chosenSize || chosenSize === globalConfig.defaultSizeOption) {
      setDisplayHelper(true);
      setQuantity(globalConfig.defaultQuantityOption);
    } else {
      setDisplayHelper(false);
      setQuantity(number);
    }
  };

  // todo product rating
  // todo search by brand on click by brand
  return (
    <Box className={classes.card}>
      <Typography className={classes.name}>{capitalize(name)}</Typography>
      <Divider orientation='horizontal' className={classes.divider}/>
      <ProductRating value={rating || 4} classes={classes.rating}/>
      <Divider orientation='horizontal' className={classes.divider}/>
      <Box className={classes.pricesBox}>
        {isOnSale ? <Price value={price}/> : null}
        <SalePrice value={salePrice}/>
      </Box>
      <Box className={classes.productInfo}>
        <Typography variant='body2' gutterBottom>Brand: <span
          className={classes.brand}>{brandId.name}</span></Typography>
        <Typography variant='body2' gutterBottom>Product code: {productId}</Typography>
      </Box>
      <Typography variant='caption' component='p' className={classes.description}>{description}</Typography>
      <Box className={classes.colorBox}>
        <Typography variant='body2'>Color: <span className={classes.colorName}>{color}</span></Typography>
        <Link variant='body2' className={classes.link}>View sizes guide</Link>
      </Box>
      <Box>
        {displayHelper
          ? <Typography
            variant='subtitle1'
            style={{color: colors.noticeColor}}>
                  Please, chose size
          </Typography>
          : null}
        <Box className={classes.selectBox}>
          <SelectSimple value={chosenSize}
            classes={classes}
            handleChange={handleSetSize}
            options={mapArrayToOptions(sizesArray)}/>
          <Quantity quantity={quantity} id={productData._id} classes={classes} max={maxQuantity || 5} handleQuantity={handleQuantity}/>
        </Box>
        <Box className={classes.actionBox}>
          <ThemeProvider theme={theme}>
            <ActionButtons classes={classes}
              product={productData}
              quantity={quantity}
              sizeId={sizeId}
              width={width}
              disabledSpacing={true}
              isProductPage={true}
              setDisplayHelper={setDisplayHelper}
            />
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

ProductPageView.propTypes = {
  productData: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  productsQuantity: PropTypes.array.isRequired,
  getProductsQuantity: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsQuantity: data => dispatch(getProductsQuantity(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(ProductPageView)));
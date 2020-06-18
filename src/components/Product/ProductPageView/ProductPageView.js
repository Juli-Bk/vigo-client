import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Box, Divider, Link, ThemeProvider, Typography, withWidth} from '@material-ui/core';
import {connect} from 'react-redux';

import useStyles from './ProductPageViewStyles';
import {theme} from './ProductPageViewTheme';
import {capitalize, makeNumbersArray, mapArrayToOptions} from '../../../helpers/helpers';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';
import SelectSimple from '../../Select/SelectSimple';
import {setChosenQuantity, setChosenSize} from '../../../redux/actions/actions';

const ProductPageView = (props) => {
  const classes = useStyles();
  const {productData, width, productQuantity} = props;
  const {name, description, price, rating, brandId, salePrice, productId, isOnSale} = productData;
  const [chosenSize, setChosenSize] = useState('');
  const [chosenQuantity, setChosenQuantity] = useState(1);
  const [quantityOfCurrentSize, setQuantityOfCurrentSize] = useState(1);
  const sizesArray = [];

  productQuantity.length && productQuantity.forEach(item => {
    sizesArray.push(item.sizeId.name);
  });
  sizesArray.unshift('Select Size');

  const handleSetQuantity = (event) => {
    setChosenQuantity(Number(event.target.value));
  };

  const handleSetSize = (event) => {
    setChosenSize(event.target.value);
    setQuantityOfCurrentSize(productQuantity.find(item => item.sizeId.name === event.target.value).quantity);
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
        <Typography variant='body2'>Color: <span className={classes.colorName}>{capitalize(productQuantity.length && productQuantity[0].colorId.name)}</span></Typography>
        <Link variant='body2' className={classes.link}>View sizes guide</Link>
      </Box>
      <Box>
        <Box className={classes.selectBox}>
          <SelectSimple value={chosenSize}
            classes={classes}
            handleChange={handleSetSize}
            options={mapArrayToOptions(sizesArray)}/>
          <SelectSimple value={chosenQuantity}
            classes={classes}
            handleChange={handleSetQuantity}
            options={mapArrayToOptions(makeNumbersArray(quantityOfCurrentSize))}/>
        </Box>
        <Box className={classes.actionBox}>
          <ThemeProvider theme={theme}>
            <ActionButtons classes={classes}
              product={productData}
              width={width}
              disabledSpacing={true}
              isProductPage={true}
            />
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

ProductPageView.propTypes = {
  productData: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

const mapStateToProps = store => {
  return {
    size: store.size,
    quantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSize: value => dispatch(setChosenSize(value)),
    setQuantity: value => dispatch(setChosenQuantity(value))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(ProductPageView)));
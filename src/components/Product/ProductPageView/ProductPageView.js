import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography, Box, ThemeProvider, withWidth, Link } from '@material-ui/core';
import { connect } from 'react-redux';

import useStyles from './ProductPageViewStyles';
import { theme } from './ProductPageViewTheme';
import { capitalize, mapArrayToOptions, makeNumbersArray } from '../../../helpers/helpers';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';
import SelectSimple from '../../Select/SelectSimple';
import { setChosenQuantity, setChosenSize } from '../../../redux/actions/actions';

const ProductPageView = (props) => {
  const classes = useStyles();
  const { productData, width, productQuantity, size, quantity, setSize, setQuantity } = props;
  const { name, description, price, rating, brandId, salePrice, productId } = productData;

  const sizesArray = ['xs', 's', 'm', 'l', 'xl'];
  sizesArray.unshift('Select Size');

  const handleSetQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleSetSize = (event) => {
    setSize(event.target.value);
  };

  // todo product rating
  // todo color
  // todo search by brand on click by brand
  return (
    <Box className={classes.card}>
      <Typography className={classes.name}>{capitalize(name)}</Typography>
      <Divider orientation='horizontal' className={classes.divider}/>
      <ProductRating value={rating || 4} classes={classes.rating}/>
      <Divider orientation='horizontal' className={classes.divider}/>
      <Box className={classes.productInfo}>
        <Typography variant='body2' gutterBottom>Brand: <span className={classes.brand}>{brandId.name}</span></Typography>
        <Typography variant='body2' gutterBottom>Product code: {productId}</Typography>
      </Box>
      <Typography variant='caption' component='p' className={classes.description}>{description}</Typography>
      <Box className={classes.colorBox}>
        <Typography variant='body2'>Color: <span className={classes.colorName}>{capitalize('red')}</span></Typography>
        <Link variant='body2' className={classes.link}>View sizes guide</Link>
      </Box>
      <Box className={classes.selectBox}>
        <SelectSimple value={size}
          classes={classes}
          handleChange={handleSetSize}
          options={mapArrayToOptions(sizesArray)}/>
        <SelectSimple value={quantity}
          classes={classes}
          handleChange={handleSetQuantity}
          options={mapArrayToOptions(makeNumbersArray(productQuantity))}/>
      </Box>
      <Box className={classes.actionBox}>
        <Box className={classes.pricesBox}>
          <Price value={price}/>
          {salePrice ? <SalePrice value={salePrice} /> : null}
        </Box>
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
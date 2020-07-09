import React, {useEffect, useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Box, Divider, ThemeProvider, Typography, withWidth} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import {Link} from 'react-router-dom';

import {
  capitalize,
  mapArrayToOptions,
  getMaxQuantity,
  getProductStockData,
  getColorData,
  getChosenSizeId,
  getSizesArray
} from '../../../helpers/helpers';
import {getProductsQuantity} from '../../../redux/actions/quantity';
import {useStyles} from './ProductPageViewStyles';
import {theme} from './ProductPageViewTheme';
import globalConfig from '../../../globalConfig';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';
import SelectBox from '../../SelectBox/SelectBox';
import Quantity from '../Quantity/Quantity';
import { setPopoverOpenState } from '../../../redux/actions/actions';
import PopoverMessage from '../../PopoverMessage/PopoverMessage';
import ModalSizeTable from '../../ModalSizeTable/ModalSizeTable';

const ProductPageView = (props) => {
  const classes = useStyles();

  const {productData, width, productsQuantity, getProductsQuantity, setPopoverOpen} = props;
  const {name, description, price, rating, brandId, salePrice, productId, isOnSale, _id} = productData;

  const [chosenSize, setChosenSize] = useState('');
  const [quantity, setQuantity] = useState(globalConfig.defaultQuantityOption);
  const [productQuantity, setProductQuantity] = useState([]);
  const [isSizeTableOpen, setIsSizeTableOpen] = useState(false);

  const handleClickOpen = () => {
    setIsSizeTableOpen(true);
  };

  const handleClose = () => {
    setIsSizeTableOpen(false);
  };

  const color = useMemo(() => getColorData(productQuantity), [productQuantity]);
  const maxQuantity = useMemo(() => {
    getMaxQuantity(productQuantity, chosenSize);
  }, [chosenSize, productQuantity]);
  const sizesArray = useMemo(() => getSizesArray(productQuantity), [productQuantity]);
  const sizeId = getChosenSizeId(productQuantity, chosenSize);

  useEffect(() => {
    getProductsQuantity([_id]);
    const quantityOfCurrentProduct = getProductStockData(productsQuantity, _id);
    setProductQuantity(quantityOfCurrentProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenSize, productsQuantity, productData, getProductsQuantity, getProductStockData]);

  const handleSetSize = useCallback((event) => {
    if (event.target.value !== globalConfig.defaultSizeOption) {
      setChosenSize(event.target.value);
    }
  }, [setChosenSize]);

  const handleQuantity = useCallback((id, number) => {
    if (!chosenSize || chosenSize === globalConfig.defaultSizeOption) {
      setPopoverOpen(true);
      setQuantity(globalConfig.defaultQuantityOption);
    } else {
      setQuantity(number);
    }
  }, [chosenSize, setPopoverOpen]);

  // todo product rating
  // todo search by brand on click by brand
  return (
    <Box className={classes.card}>
      <Typography className={classes.name}>{capitalize(name)}</Typography>
      <Divider orientation='horizontal' className={classes.divider}/>
      <ProductRating value={rating || 4}/>
      <Divider orientation='horizontal' className={classes.divider}/>
      <Box className={classes.pricesBox}>
        {isOnSale ? <Price value={price}/> : null}
        <SalePrice value={salePrice}/>
      </Box>
      <Box className={classes.productInfo}>
        <Link to={`/products/filter?brandId=${brandId._id}`} className={classes.link}>
          <Typography variant='body2' gutterBottom>Brand: <span
            className={classes.brand}>{brandId.name}</span></Typography>
        </Link>
        <Typography variant='body2' gutterBottom>Product code: {productId}</Typography>
      </Box>
      <Typography variant='caption' component='p' className={classes.description}>{description}</Typography>
      <Box className={classes.colorBox}>
        <Typography variant='body2'>Color: <span className={classes.colorName}>{color.name}</span></Typography>
        <MuiLink variant='body2' className={classes.link} onClick={handleClickOpen}>View sizes guide</MuiLink>
        <ModalSizeTable targetId={_id} isOpen={isSizeTableOpen} handleClose={handleClose}/>
      </Box>
      <Box>
        <Box className={classes.selectBox}>
          <SelectBox value={chosenSize}
            classes={classes}
            handleChange={handleSetSize}
            options={mapArrayToOptions(sizesArray)}/>
          <Quantity quantity={quantity} id={productData._id} classes={classes} max={maxQuantity || 5} handleQuantity={handleQuantity}/>
        </Box>
        <PopoverMessage
          anchorEl={document.querySelector('select')}
          popoverContent='Please, choose size'/>
        <Box className={classes.actionBox}>
          <ThemeProvider theme={theme}>
            <ActionButtons classes={classes}
              product={productData}
              quantity={quantity}
              sizeId={sizeId}
              colorId={color.id}
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
  width: PropTypes.string.isRequired,
  productsQuantity: PropTypes.array.isRequired,
  getProductsQuantity: PropTypes.func.isRequired,
  setPopoverOpen: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
    productsQuantity: store.quantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsQuantity: data => dispatch(getProductsQuantity(data)),
    setPopoverOpen: flag => dispatch(setPopoverOpenState(flag))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(withWidth()(ProductPageView)));
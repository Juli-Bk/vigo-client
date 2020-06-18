import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box, Typography, CardMedia, ThemeProvider,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import {
  capitalize,
  formPriceString,
  getStorageData,
  cartHandler,
  toggleWishItems,
  mapArrayToOptions, makeNumbersArray
} from '../../helpers/helpers';
import { changeWishList, changeShoppingCart } from '../../redux/actions/actions';
import SaleInfoBox from '../../components/Product/SaleInfoBox/SaleInfoBox';
import SalePrice from '../../components/Product/SalePrice/SalePrice';
import Price from '../../components/Product/Price/Price';
import { theme } from './ProductsTableTheme';
import useStyles from './ProductsTableStyles';
import globalConfig from '../../globalConfig';
import AjaxUtils from '../../ajax';
import SelectSimple from '../../components/Select/SelectSimple';

const ProductsTable = (props) => {
  // todo quantity
  // eslint-disable-next-line no-unused-vars
  const {
    isMobile,
    products,
    wishList,
    changeWishList,
    changeShoppingCart,
    isShoppingCart
  } = props;
  const classes = useStyles();
  const [chosenQuantity, setChosenQuantity] = useState({});

  useEffect(() => {
    products.forEach(product => {
      AjaxUtils.Quantity.getQuantityByProductId(product._id)
        .then(result => {
          // todo get quantity from redux or from DB
          // setProductsQuantity(...productsQuantity, [])
        });
    });
  });

  const handleSetQuantity = (event, id) => {
    setChosenQuantity({[id]: Number(event.target.value)});
  };

  const getSubtotal = (price, quantity) => {
    return quantity ? price * quantity : price;
  };

  const deleteFromWishList = (id) => {
    toggleWishItems(id);
    changeWishList(getStorageData('wishList'));
  };
  // to do different functions to add znd to delete
  const deleteFromCart = (id) => {
    cartHandler(id);
    changeShoppingCart(getStorageData('shoppingCart'));
  };
  // todo replace logic
  const rows = products.map(product => {
    return isShoppingCart
      ? {
        imgUrl: product.imageUrls[0],
        mainData: {name: product.name, color: product.color, size: product.size},
        productCode: product.productId,
        price: product.price,
        id: product._id,
        salePrice: product.salePrice
      }
      : {
        imgUrl: product.imageUrls[0],
        mainData: {name: product.name, color: product.color, size: product.size},
        productCode: product.productId,
        price: product.price,
        id: product._id,
        salePrice: product.salePrice
      };
  });

  return (
    <ThemeProvider theme={theme}>
      {wishList.length && products.length &&
      <TableContainer component={Box}>
        <Table aria-label="products table">
          <TableHead>
            { isMobile
              ? <TableRow>
                <TableCell align="center" className={classes.tableHead}>
                  {products.length} products in your cart
                </TableCell>
              </TableRow>
              : <TableRow>
                <TableCell align="center" className={classes.tableHead}>Product name</TableCell>
                <TableCell align="center" className={classes.tableHead}>Product code</TableCell>
                { isShoppingCart
                  ? <>
                    <TableCell align="center" className={classes.tableHead}>Unit Price</TableCell>
                    <TableCell align="center" className={classes.tableHead}>Quantity</TableCell>
                    <TableCell align="center" className={classes.tableHead}>Subtotal</TableCell>
                  </>
                  : <>
                    <TableCell align="center" className={classes.tableHead}>Price</TableCell>
                    <TableCell align="center" className={classes.tableHead}>Sale price</TableCell>
                <TableCell align="center" className={classes.tableHead}>Delete</TableCell>
                  </>
                }
                <TableCell align="center" className={classes.tableHead}>
                  <CloseIcon className={classes.closeBtn}/>
                </TableCell>
              </TableRow> }
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} className={classes.tableRow}>
                { isMobile
                  ? <TableCell component="th" scope="row" className={classes.firstCell}>
                    <Box className={classes.linkBox}>
                      <CardMedia image={row.imgUrl} className={classes.img}/>
                      <CloseIcon data-testid='deleteIcon' className={classes.closeIcon} onClick={() => {
                        isShoppingCart ? deleteFromCart(row.id) : deleteFromWishList(row.id);
                      }}/>
                    </Box>
                    <Box className={classes.textBox}>
                      <Link to={`/products/${row.id}`}
                        className={classes.name}>{capitalize(row.mainData.name)}</Link>
                      <Typography className={classes.details}>Color: {row.mainData.color}</Typography>
                      <Typography className={classes.details}>Size: {row.mainData.size}</Typography>
                      <Typography className={classes.details}>Product code: <span className={classes.codeSmall}>{row.productCode}</span>
                      </Typography>
                      <Typography variant='caption' component='p' className={classes.details}>
                                Price: <span className={classes.price}>
                          {formPriceString(row.price, globalConfig.priceIsInteger)}
                        </span>
                      </Typography>
                      <Typography variant='caption' component='p' className={classes.details}>
                                Sale price: <span className={classes.salePrice}>
                          {formPriceString(row.salePrice, globalConfig.priceIsInteger)}
                        </span>
                      </Typography>
                    </Box>
                  </TableCell>
                  : <>
                    <TableCell component="th" scope="row" className={classes.firstCell}>
                      <Link to={`/products/${row.id}`} className={classes.linkBox}>
                        <CardMedia image={row.imgUrl} className={classes.img}/>
                        {row.price !== row.salePrice
                          ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
                      </Link>
                      <Box className={classes.textBox}>
                        <Link to={`/products/${row.id}`}
                          className={classes.name}>{capitalize(row.mainData.name)}</Link>
                        {isShoppingCart
                          ? <>
                            <Typography className={classes.details}>Color: {row.mainData.color}</Typography>
                            <Typography className={classes.details}>Size: {row.mainData.size}</Typography>
                          </> : null}
                      </Box>
                    </TableCell>
                    <TableCell align="center" className={classes.code}>{row.productCode}</TableCell>
                    {isShoppingCart
                      ? <>
                        <TableCell align="center" className={classes.code}>
                          <SalePrice value={row.salePrice}/>
                        </TableCell>
                        <TableCell align="center" className={classes.code}>
                          <Box>
                            <SelectSimple value={chosenQuantity[row.id] || 1}
                              classes={classes}
                              handleChange={(event) => handleSetQuantity(event, row.id)}
                              options={mapArrayToOptions(makeNumbersArray(10))}/>
                          </Box>
                        </TableCell>
                        <TableCell align="center" className={classes.code}>
                          <SalePrice isSubtotal={true}
                            value={getSubtotal(row.salePrice, chosenQuantity[row.id])}/>
                        </TableCell>
                      </>
                      : <>
                        <TableCell align="center" className={classes.code}>
                          <Price value={row.price}/>
                        </TableCell>
                        <TableCell align="center" className={classes.code}>
                          <SalePrice value={row.salePrice}/>
                        </TableCell>
                      </>
                    }
                    <TableCell align="center">
                      <CloseIcon data-testid='deleteIcon' className={classes.closeIcon} onClick={() => {
                        isShoppingCart ? deleteFromCart(row.id) : deleteFromWishList(row.id);
                      }}/>
                    </TableCell>
                  </>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </ThemeProvider>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
  wishlist: PropTypes.array,
  changeWishList: PropTypes.func.isRequired,
  changeShoppingCart: PropTypes.func.isRequired,
  isShoppingCart: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    wishList: store.wishList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data)),
    changeShoppingCart: data => dispatch(changeShoppingCart(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductsTable));
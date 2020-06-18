import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box, Typography, CardMedia, ThemeProvider,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { capitalize, formPriceString, getStorageData, toggleWishItems } from '../../helpers/helpers';
import { changeWishList } from '../../redux/actions/actions';
import SaleInfoBox from '../../components/Product/SaleInfoBox/SaleInfoBox';
import SalePrice from '../../components/Product/SalePrice/SalePrice';
import Price from '../../components/Product/Price/Price';
import { theme } from './ProductsTableTheme';
import useStyles from './ProductsTableStyles';
import globalConfig from '../../globalConfig';

const ProductsTable = (props) => {
  // todo quantity and reducer for shopping cart
  // eslint-disable-next-line no-unused-vars
  const { isMobile, products, wishList, changeWishList, isShoppingCart } = props;
  const classes = useStyles();

  const deleteFromWishList = (id) => {
    toggleWishItems(id);
    changeWishList(getStorageData('wishList'));
  };

  const deleteFromCart = (id) => {
    // todo logic for shopping cart
    console.log(`product with ${id} deleted `);
  };

  const rows = products.map(product => {
    return {
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
                <TableCell align="center" className={classes.tableHead}>Price</TableCell>
                <TableCell align="center" className={classes.tableHead}>Sale price</TableCell>
                <TableCell align="center" className={classes.tableHead}>Delete</TableCell>
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
                        <Typography className={classes.details}>Color: {row.mainData.color}</Typography>
                        <Typography className={classes.details}>Size: {row.mainData.size}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" className={classes.code}>{row.productCode}</TableCell>
                    <TableCell align="center" className={classes.code}>
                      <Price value={row.price}/>
                    </TableCell>
                    <TableCell align="center" className={classes.code}>
                      <SalePrice value={row.salePrice}/>
                    </TableCell>
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
  isShoppingCart: PropTypes.bool,
  isMobile: PropTypes.bool.isRequired,
  currentQuantity: PropTypes.any,
  setCurrentQuantity: PropTypes.func
};

const mapStateToProps = store => {
  return {
    wishList: store.wishList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductsTable));
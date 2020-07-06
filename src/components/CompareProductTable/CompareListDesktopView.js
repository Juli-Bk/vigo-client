import { Box, CardMedia, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import { capitalize } from '../../helpers/helpers';
import SalePrice from '../Product/SalePrice/SalePrice';
import useStyles from '../../styles/formStyle/formStyle';
import ProductRating from '../Product/ProductRating/ProductRating';
import CloseIcon from '@material-ui/icons/Close';
import AddToCartButton from '../Product/ActionButtons/ButtonAddToCart/AddToCartButton';
import {
  toggleModalSize
} from '../../redux/actions/actions';
import {changeShoppingCart} from '../../redux/actions/shopCart';

const CompareListDesktopView = (props) => {
  const {classes, deleteFromCompareList, rating, rows, addToCart} = props;
  const styles = useStyles();

  function createData (name, price, brand, availability, rating, description) {
    return { name, price, brand, availability, rating, description};
  }
  const titles = [
    createData('Product Name'),
    createData('Price'),
    createData('Brand'),
    createData('Availability'),
    createData('Rating'),
    createData('Description')
  ];
  console.log(titles);

  const addToShopCart = (productId, quantity = 1, sizeId, colorId) => {
    addToCart(productId, quantity, sizeId, colorId);
    changeShoppingCart();
    toggleModalSize(false);
  };

  return (
    <Grid className={classes.compareTable} container aria-label='compare-table'>
      <Grid item >
        {rows.map((row) => {
          return (
            <Box align='center' key={row.id} className={classes.tableRowCompare}>
              <Grid item align='center'>
                <Link to={`/products/${row.id}`} className={classes.linkBox}>
                  <CardMedia image={row.imgUrl} className={classes.img}/>
                  {row.isOnSale
                    ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
                </Link>
                <Box className={classes.textBox}>
                  <Link to={`/products/${row.id}`}
                    className={classes.nameCompare}>{capitalize(row.name)}</Link>
                </Box>
              </Grid>
              <Box className={{marginTop: 30}} align='center'>{row.id}</Box>

              <Box align='center' className={classes.code}><SalePrice value={row.salePrice}/>
              </Box>

              <Box align='center' className={classes.code}>{row.brand}</Box>
              <Box align='center' className={classes.code}>Available</Box>

              <Box align='center' className={classes.code}>
                <ProductRating value={rating || 4}/>
              </Box>

              <Box align='center'>
                <Typography
                  variant='caption'
                  component='p'
                  className={classes.details}>{row.description}</Typography>
              </Box>

              <Box align='center'>
                <AddToCartButton addToCart={addToShopCart} classes={styles.button}/>
              </Box>

              <Box align="center">
                <CloseIcon align='center' data-testid='deleteIcon'
                  className={classes.closeIcon}
                  onClick={() => {
                    deleteFromCompareList(row.id);
                  }}/>
              </Box>
            </Box>);
        }
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(CompareListDesktopView);
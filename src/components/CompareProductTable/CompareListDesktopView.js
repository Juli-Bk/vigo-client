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

  const addToShopCart = (productId, quantity, sizeId, colorId) => {
    addToCart(productId, quantity, sizeId, colorId);
    changeShoppingCart();
    toggleModalSize(false);
  };

  return (
    <Grid container className={classes.generalTable} >

      <Grid className={classes.headers} >

        <Grid item className={classes.img}>{}</Grid>
        <Grid className={classes.smallcell}>Product name</Grid>
        <Grid className={classes.smallcell}>Product ID</Grid>
        <Grid className={classes.smallcell}>Price</Grid>
        <Grid className={classes.smallcell}>Brand</Grid>
        <Grid className={classes.smallcell}>Availability</Grid>
        <Grid className={classes.smallcell}>Rating</Grid>
        <Grid className={classes.bigCell}>Description</Grid>
        <Grid className={classes.smallcell}>Add to bag</Grid>
        <Grid className={classes.smallcell}>Delete</Grid>

      </Grid>
      <Grid className={classes.compareTable} container aria-label='compare-table'>

        <Grid item >
          {rows.map((row) => {
            return (
              <Box align='center' key={row.id} className={classes.tableRowCompare}>

                <Grid item className={classes.image}>
                  <Link to={`/products/${row.id}`} className={classes.linkBox}>
                    <CardMedia image={row.imgUrl} className={classes.img}/>
                    {row.isOnSale
                      ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
                  </Link>

                  <Grid item className={classes.textBox}>
                    <Link to={`/products/${row.id}`}
                      className={classes.nameCompare}>{capitalize(row.name)}</Link>
                  </Grid>
                </Grid>

                <Box align='center' className={classes.cell}>Product ID: {row.id}</Box>

                <Box align='center' className={classes.cell}><SalePrice value={row.salePrice}/>
                </Box>

                <Box align='center' className={classes.cell}>{row.brand}Brand</Box>
                <Box align='center' className={classes.cell}>Available</Box>

                <Box align='center' className={classes.cell}>
                  <ProductRating value={rating || 4}/>
                </Box>

                <Box align='center'>
                  <Typography
                    variant='caption'
                    component='p'
                    className={classes.details}>{row.description}</Typography>
                </Box>

                <Box align='center'>
                  <AddToCartButton id={'id'} addToCart={addToShopCart} classes={styles.button}/>
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
    </Grid>
  );
};

export default React.memo(CompareListDesktopView);
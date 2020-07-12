import React from 'react';
import {connect} from 'react-redux';
import { Box, CardMedia, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import { capitalize } from '../../helpers/helpers';
import SalePrice from '../Product/SalePrice/SalePrice';
import useStyles from '../../styles/formStyle/formStyle';
import ProductRating from '../Product/ProductRating/ProductRating';
import CloseIcon from '@material-ui/icons/Close';
import ActionButtons from '../Product/ActionButtons/ActionButtons';
import { changeCompareList } from '../../redux/actions/actions';

const CompareListDesktopView = (props) => {
  const { classes, rating, rows, changeCompareList } = props;
  const styles = useStyles();

  return (
    <Grid className={classes.generalTable}>
      <Grid className={classes.headers}>
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
        <Grid item>
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
                <Box align='center' className={classes.cell}>Code {row.productCode}</Box>
                <Box align='center' className={classes.cell}><SalePrice value={row.salePrice}/>
                </Box>
                <Box align='center' className={classes.cellUp}>{row.brand}</Box>
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
                <Box>
                  <ActionButtons isComparePage={true} classes={styles} product={row.product}/>
                </Box>
                <Box align='center'>
                  <CloseIcon align='center' data-testid='deleteIcon'
                    className={classes.closeIcon}
                    onClick={() => {
                      changeCompareList(row.id);
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
const mapDispatchToProps = dispatch => {
  return {
    changeCompareList: productId => dispatch(changeCompareList(productId))
  };
};
export default React.memo(connect(null, mapDispatchToProps)(CompareListDesktopView));

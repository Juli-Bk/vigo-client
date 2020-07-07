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
  const {classes, rating, rows, changeCompareList} = props;
  const styles = useStyles();

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
              <Box style={{marginTop: 30}} align='center'>{row.id}</Box>

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
                <ActionButtons isComparePage={true} classes={styles} product={row.product}/>
              </Box>

              <Box align="center">
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
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeCompareList: (id) => dispatch(changeCompareList(id))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(CompareListDesktopView));

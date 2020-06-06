import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, Box, ThemeProvider, CardMedia, withWidth } from '@material-ui/core';

import useStyles from './WishListViewStyles';
import { theme } from './WishListViewTheme';
import { capitalize } from '../../../helpers/helpers';
import SaleInfoBox from '../SaleInfoBox/SaleInfoBox';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';

const WishListView = (props) => {
  const classes = useStyles();
  const { productData, width } = props;
  const { name, price, rating, imageUrls, salePrice } = productData;

  // todo product rating
  return (
    <Box className={classes.card}>
      <Link to={`/products/${productData._id}`} className={classes.linkBox}>
        <CardMedia image={imageUrls[0]} title='clothing' className={classes.img}>
          {price !== salePrice ? <SaleInfoBox price={price} salePrice={salePrice}/> : null}
        </CardMedia>
      </Link>
      <Box className={classes.content}>
        <Box className={classes.text}>
          <Link to={`/products/${productData._id}`} className={classes.name}>{capitalize(name)}</Link>
          <ProductRating value={rating || 4}/>
        </Box>
        <Divider orientation={width === 'lg' || width === 'xl' ? 'vertical' : 'horizontal'}/>
        <Box className={classes.actionBox}>
          <Box className={classes.pricesBox}>
            <Price value={price}/>
            {salePrice ? <SalePrice value={salePrice} /> : null}
          </Box>
          <ThemeProvider theme={theme}>
            <ActionButtons classes={classes}
              product={productData}
              width={width}
              disabledSpacing={true}/>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

WishListView.propTypes = {
  productData: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default React.memo(withWidth()(WishListView));
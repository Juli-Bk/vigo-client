import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, Typography, Box, ThemeProvider, CardMedia, withWidth } from '@material-ui/core';

import useStyles from './ProductListViewStyles';
import { theme } from './ProductListViewTheme';
import { capitalize } from '../../../helpers/helpers';
import SaleInfoBox from '../SaleInfoBox/SaleInfoBox';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';

const ProductListView = (props) => {
  const classes = useStyles();
  const { productData, width } = props;
  const { name, description, price, rating, imageUrls, salePrice, isOnSale } = productData;
  const sale = isOnSale && price > salePrice;

  // todo product rating
  return (
    <Box className={classes.card}>
      <Link to={`/products/${productData._id}`} className={classes.linkBox}>
        <CardMedia image={imageUrls[0]} title='clothing' className={classes.img}>
          { sale ? <SaleInfoBox price={price} salePrice={salePrice}/> : null}
        </CardMedia>
      </Link>
      <Box className={classes.content}>
        <Box className={classes.text}>
          <Link to={`/products/${productData._id}`} className={classes.name}>{capitalize(name)}</Link>
          <ProductRating value={rating || 4}/>
          <Typography variant='caption' component='p' className={classes.description}>{description}</Typography>
        </Box>
        <Divider orientation={width === 'lg' || width === 'xl' ? 'vertical' : 'horizontal'}/>
        <Box className={classes.actionBox}>
          <Box className={classes.pricesBox}>
            { sale ? <Price value={price}/> : null}
            <SalePrice value={salePrice} />
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

ProductListView.propTypes = {
  productData: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default React.memo(withWidth()(ProductListView));
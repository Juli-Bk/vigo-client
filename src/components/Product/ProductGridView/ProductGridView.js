import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardContent, Box, ThemeProvider, CardMedia } from '@material-ui/core';

import useStyles from './ProductGridViewStyles';
import { theme } from './ProductGridViewTheme';
import { capitalize, makeShortText } from '../../../helpers/helpers';
import Card from '@material-ui/core/Card';
import SaleInfoBox from '../SaleInfoBox/SaleInfoBox';
import ActionButtons from '../ActionButtons/ActionButtons';
import ProductRating from '../ProductRating/ProductRating';
import SalePrice from '../SalePrice/SalePrice';
import Price from '../Price/Price';

const ProductGridView = (props) => {
  const classes = useStyles();
  const { productData } = props;
  const { name, description, price, rating, imageUrls, salePrice } = productData;

  const productDescription = capitalize(makeShortText(description));
  // todo product rating
  return (
    <Card className={classes.card}>
      <ThemeProvider theme={theme}>
        <Box className={classes.imageBox}>
          {price !== salePrice ? <SaleInfoBox price={price} salePrice={salePrice}/> : null}
          <CardMedia image={imageUrls[0]} title='clothing' className={classes.img} />
          <CardContent className={classes.overlay}>
            <ProductRating value={rating || 4}/>
            <Link to={`/products/${productData._id}`} className={classes.description}>
              {productDescription}
            </Link>
            <ActionButtons classes={classes}
              product={productData}
              disabledSpacing={false}/>
          </CardContent>
        </Box>
        <CardContent>
          <Link to={`/products/${productData._id}`} className={classes.name}>{capitalize(name)}</Link>
          <Box className={classes.pricesBox}>
            <Price value={price}/>
            {salePrice ? <SalePrice value={salePrice} /> : null}
          </Box>
        </CardContent>
      </ThemeProvider>
    </Card>
  );
};

ProductGridView.propTypes = {
  productData: PropTypes.object.isRequired
};

export default React.memo(ProductGridView);
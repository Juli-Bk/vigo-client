import {
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { capitalize, formPriceString } from '../../helpers/helpers';
import globalConfig from '../../globalConfig';
import ActionButtons from '../Product/ActionButtons/ActionButtons';

const WishListMobileView = (props) => {
  const {rows, classes, productsLength, deleteFromWishList} = props;

  return (
    <Table aria-label="products table">
      <TableHead>
        <TableRow>
          <TableCell align="center" className={classes.tableHead}>
            {productsLength} products in your Wishlist
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.firstCell}>
              <Box className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                <CloseIcon data-testid='deleteIcon'
                  className={classes.closeIcon}
                  onClick={() => {
                    deleteFromWishList(row.id);
                  }}/>
              </Box>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.mainData.name)}</Link>
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
                <ActionButtons isComparePage={true} classes={classes} product={row.product}/>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
  ;
};

export default WishListMobileView;
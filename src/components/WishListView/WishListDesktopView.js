import { Box, CardMedia, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import { capitalize } from '../../helpers/helpers';
import Price from '../Product/Price/Price';
import SalePrice from '../Product/SalePrice/SalePrice';
import CloseIcon from '@material-ui/icons/Close';
import ActionButtons from '../Product/ActionButtons/ActionButtons';

const WishlistDesktopView = (props) => {
  const {rows, classes, deleteFromWishList} = props;

  return (
    <Table aria-label="products table">
      <TableHead>
        <TableRow>
          <TableCell align="center" className={classes.tableHead}>Product name</TableCell>
          <TableCell align="center" className={classes.tableHead}>Product code</TableCell>
          <TableCell align="center" className={classes.tableHead}>Price</TableCell>
          <TableCell align="center" className={classes.tableHead}>Sale price</TableCell>
          <TableCell align="center" className={classes.tableHead}>Add to bag</TableCell>
          <TableCell align="center" className={classes.tableHead}>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell component="th" scope="row" className={classes.firstCell}>
              <Link to={`/products/${row.id}`} className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                {
                  row.isOnSale
                    ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/>
                    : null
                }
              </Link>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.mainData.name)}</Link>
              </Box>
            </TableCell>
            <TableCell align="center" className={classes.code}>{row.productCode}</TableCell>
            <TableCell align="center" className={classes.code}>
              <Price value={row.price}/>
            </TableCell>
            <TableCell align="center" className={classes.code}>
              <SalePrice value={row.salePrice}/>
            </TableCell>
            <TableCell align="center" className={classes.code}>
              <ActionButtons isComparePage={true} classes={classes} product={row.product}/>
            </TableCell>
            <TableCell align="center">
              <CloseIcon data-testid='deleteIcon'
                className={classes.closeIcon}
                onClick={() => {
                  deleteFromWishList(row.id);
                }}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WishlistDesktopView;
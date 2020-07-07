import React from 'react';
import {connect} from 'react-redux';
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
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { capitalize, formPriceString } from '../../helpers/helpers';
import globalConfig from '../../globalConfig';
import { changeCompareList } from '../../redux/actions/actions';

const CompareListMobileView = (props) => {
  const {rows, classes, productsLength, changeCompareList} = props;

  return (
    <Table aria-label="products table">
      <TableHead>
        <TableRow>
          <TableCell align="center" className={classes.tableHead}>
            {productsLength} products to compare
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
                    changeCompareList(row.id);
                  }}/>
              </Box>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.name)}</Link>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
  ;
};

const mapDispatchToProps = dispatch => {
  return {
    changeCompareList: (id) => dispatch(changeCompareList(id))
  };
};

export default React.memo(connect(null, mapDispatchToProps)(CompareListMobileView));
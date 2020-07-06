import { Box, CardMedia, Table, TableBody, TableCell, Grid, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import { capitalize } from '../../helpers/helpers';
import SalePrice from '../Product/SalePrice/SalePrice';
import useStyles from '../../styles/formStyle/formStyle';
import ProductRating from '../Product/ProductRating/ProductRating';
import CloseIcon from '@material-ui/icons/Close';
import AddToCartButton from '../Product/ActionButtons/ButtonAddToCart/AddToCartButton';
import { addToCart } from '../../pages/ShoppingCart/cartHelpers';
import Divider from '@material-ui/core/Divider';

const CompareListDesktopView = (props) => {
  const {classes, deleteFromCompareList, rating, description, brand, rows, addToCart} = props;
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

  // TODO const addToCart = () => {};

  return (
    <Grid className={classes.gridContainer} container aria-label='compare-table'>
      <Grid item >
        {rows.map((row) => (
          <Box key={row.id} className={classes.tableRowCompare}>
            <Box >
              <Link to={`/products/${row.id}`} className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                {row.isOnSale
                  ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
              </Link>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.nameCompare}>{capitalize(row.name)}</Link>
              </Box>
            </Box>
            <Box className={classes.code} align='center'>{row.id}</Box>

            <Box align='center' className={classes.code}><SalePrice value={row.salePrice}/>
            </Box>

            <Box align='center' className={classes.code}>{row.brand}</Box>
            <Box align='center' className={classes.code}>Available / Not available</Box>

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
              <AddToCartButton addToCart={addToCart} classes={styles.button}/>
            </Box>

            <Box align="center">
              <CloseIcon align='center' data-testid='deleteIcon'
                className={classes.closeIcon}
                onClick={() => {
                  deleteFromCompareList(row.id);
                }}/>
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

// export default function SimpleTable() {
//
//   return (
//
//       <Table aria-label='simple table='compare-table'>
//          <TableBody>
//           <TableRow>
//             <TableCell></TableCell>
//             <TableCell align='center'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='center'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='center'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='center'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//           </TableRow>
//
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell align='center'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='center'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='center'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='center'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//           </TableRow>
//
//         <TableRow>
//           <TableCell>Price</TableCell>
//           <TableCell align='center'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='center'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='center'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='center'><SalePrice value={row.salePrice}/></TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Brand</TableCell>
//           <TableCell align='center'>{row.brand}</TableCell>
//           <TableCell align='center'>{row.brand}</TableCell>
//           <TableCell align='center'>{row.brand}</TableCell>
//           <TableCell align='center'>{row.brand}</TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Availability</TableCell>
//           <TableCell align='center'>yes</TableCell>
//           <TableCell align='center'>no</TableCell>
//           <TableCell align='center'>no</TableCell>
//           <TableCell align='center'>yes</TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Rating</TableCell>
//           <TableCell align='center'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='center'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='center'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='center'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Descritption</TableCell>
//           <TableCell align='center'>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography>
//           </TableCell>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography><TableCell align='center'>
//           </TableCell>
//           <TableCell align='center'>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography>
//           </TableCell>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography><TableCell align='center'>
//           </TableCell>
//         </TableRow>
//     </TableBody>
//       </Table>

//   );
// }

export default React.memo(CompareListDesktopView);
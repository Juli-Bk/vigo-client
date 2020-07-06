import { Box, CardMedia, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
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
  return (
    <Table orientation="vertical" flexItem={true} aria-label='compare-table'>
      <TableBody >
        {rows.map((row) => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell component='th' scope='row'>
              <Link to={`/products/${row.id}`} className={classes.linkBox}>
                <CardMedia image={row.imgUrl} className={classes.img}/>
                {row.isOnSale
                  ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
              </Link>
              <Box className={classes.textBox}>
                <Link to={`/products/${row.id}`}
                  className={classes.name}>{capitalize(row.name)}</Link>
              </Box>
            </TableCell>
            <TableCell align='right'>{row.id}</TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align='right' className={classes.code}><SalePrice value={row.salePrice}/>
            </TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align='right'>{row.brand}</TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align='right'>Available / Not available</TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align='right'>
              <ProductRating value={rating || 4}/>
            </TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align='right'>
              <Typography
                variant='caption'
                component='p'
                className={classes.description}>{row.description}</Typography>
            </TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell>
              <AddToCartButton addToCart={addToCart} classes={styles.button}/>
            </TableCell>

            <Divider orientation="vertical" flexItem />

            <TableCell align="center">
              <CloseIcon data-testid='deleteIcon'
                className={classes.closeIcon}
                onClick={() => {
                  deleteFromCompareList(row.id);
                }}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
//             <TableCell align='right'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='right'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='right'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//             <TableCell align='right'>
//             <Link to={`/products/${row.id}`} className={classes.linkBox}>
//                 <CardMedia image={row.imgUrl} className={classes.img}/>
//                 {row.isOnSale
//                   ? <SaleInfoBox price={row.price} salePrice={row.salePrice}/> : null}
//               </Link></TableCell>
//           </TableRow>
//
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell align='right'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='right'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='right'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//             <TableCell align='right'><Box className={classes.textBox}>
//                 <Link to={`/products/${row.id}`}
//                   className={classes.name}>{capitalize(row.mainData.name)}</Link>
//               </Box></TableCell>
//           </TableRow>
//
//         <TableRow>
//           <TableCell>Price</TableCell>
//           <TableCell align='right'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='right'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='right'><SalePrice value={row.salePrice}/></TableCell>
//           <TableCell align='right'><SalePrice value={row.salePrice}/></TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Brand</TableCell>
//           <TableCell align='right'>{row.brand}</TableCell>
//           <TableCell align='right'>{row.brand}</TableCell>
//           <TableCell align='right'>{row.brand}</TableCell>
//           <TableCell align='right'>{row.brand}</TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Availability</TableCell>
//           <TableCell align='right'>yes</TableCell>
//           <TableCell align='right'>no</TableCell>
//           <TableCell align='right'>no</TableCell>
//           <TableCell align='right'>yes</TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Rating</TableCell>
//           <TableCell align='right'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='right'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='right'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//           <TableCell align='right'>
//           <ProductRating value={rating || 4}/>
//           </TableCell>
//         </TableRow>
//
//         <TableRow>
//           <TableCell>Descritption</TableCell>
//           <TableCell align='right'>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography>
//           </TableCell>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography><TableCell align='right'>
//           </TableCell>
//           <TableCell align='right'>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography>
//           </TableCell>
//             <Typography
//                 variant='caption'
//                 component='p'
//                 className={classes.description}>{description}</Typography><TableCell align='right'>
//           </TableCell>
//         </TableRow>
//     </TableBody>
//       </Table>

//   );
// }

export default React.memo(CompareListDesktopView);
import { Box, CardMedia, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import SaleInfoBox from '../Product/SaleInfoBox/SaleInfoBox';
import { capitalize } from '../../helpers/helpers';
import SalePrice from '../Product/SalePrice/SalePrice';
import ProductRating from '../Product/ProductRating/ProductRating';

const CompareListDesktopView = (props) => {
  const {classes, deleteFromCompareList, rating, description, brand, rows} = props;

  function createData (name, price, brand, availability, rating, description) {
    return { name, price, brand, availability, rating, description};
  }
  // const rows = [
  //   createData('Product Name'),
  //   createData('Price'),
  //   createData('Brand'),
  //   createData('Availability'),
  //   createData('Rating'),
  //   createData('Description')
  // ];
  console.log(rows);
  return (
    <Table aria-label='compare-table'>
      <TableBody>
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
            <TableCell align='right' className={classes.code}><SalePrice value={row.salePrice}/>
            </TableCell>
            <TableCell align='right'>{row.brand}</TableCell>
            <TableCell align='right'>Available / Not available</TableCell>
            <TableCell align='right'>
              <ProductRating value={rating || 4}/>
            </TableCell>
            <TableCell align='right'>
              <Typography
                variant='caption'
                component='p'
                className={classes.description}>{row.description}</Typography>
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
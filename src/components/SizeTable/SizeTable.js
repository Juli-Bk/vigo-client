import React from 'react';
import useStyles from './SizeTableStyle';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import requests from '../../ajax/sizeTables/requests';

const { getSizeTableByProductId } = requests;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: '1px solid #e0e0e0'
  },
  body: {
    fontSize: 14,
    border: '1px solid #e0e0e0'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const SizeTable = (props) => {
  const { id } = props;
  const styles = useStyles();

  function createData (size, sizeType, smLenghth, inchesLength) {
    return { size, sizeType, smLenghth, inchesLength };
  }

  const fetchData = async () => {
    const data = getSizeTableByProductId(id);
    const array = await data;
    if (array[1].sizeId.sizeType === 'shoes') {
      console.log('It is shoes');
    };
    return array;
  };

  const data = fetchData();
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Size type</StyledTableCell>
            <StyledTableCell>cm</StyledTableCell>
            <StyledTableCell>inches</StyledTableCell>
            <StyledTableCell>inches</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.size}>
              <StyledTableCell component="th" scope="row">
                {row.size}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SizeTable;

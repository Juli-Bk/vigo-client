import React, {useState, useEffect} from 'react';
import useStyles from './SizeTableStyle';
import PropTypes from 'prop-types';
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
  const [data, setData] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const data = getSizeTableByProductId(id);
      const array = await data;
      if (array[1].sizeId.sizeType === 'shoes') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Foot length'],
          measurements: [`${el.footLength.cm}cm/${el.footLength.inches}"`]
        })));
      };
      if (array[1].sizeId.sizeType === 'belts') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Length'],
          measurements: [`${el.length.cm}cm/${el.length.inches}"`]
        })));
      };
      if (array[1].sizeId.sizeType === 'clothing') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Bust', 'Waist', 'Hips'],
          measurements: [`${el.bust.cm}cm/${el.bust.inches}"`, `${el.waist.cm}cm/${el.waist.inches}"`, `${el.hips.cm}cm/${el.hips.inches}"`]
        })));
      };
      if (array[1].sizeId.sizeType === 'hats') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Head size'],
          measurements: [`${el.headSize.cm}cm/${el.headSize.inches}"`]
        })));
      };
      if (array[1].sizeId.sizeType === 'scarves') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Length'],
          measurements: [`${el.length.cm}cm/${el.length.inches}"`]
        })));
      };
      if (array[1].sizeId.sizeType === 'one size') {
        setData(array.map(el => ({
          size: el.sizeId.name,
          measurementArea: ['Length'],
          measurements: [`${el.length.cm}cm/${el.length.inches}"`]
        })));
      };
    };
    fetchData();
  }, [id]);

  if (data.length > 0) {
    console.log(data);
    return (
      <TableContainer data-testid='sizeTable' component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell className={styles.cell} align="center">Size type</StyledTableCell>
              {data[0].measurementArea.map((el, id) => (
                <StyledTableCell className={styles.cell} align="center" key={id}>{el}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((el, id) => (
              <StyledTableRow key={id}>
                <StyledTableCell align="center" className={styles.cell} component="th" scope="row">
                  {el.size}
                </StyledTableCell>
                {el.measurements.map((el, id) => (
                  <StyledTableCell className={styles.cell} align="center" key={id}>{el}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

SizeTable.propTypes = {
  id: PropTypes.string.isRequired
};

export default React.memo(SizeTable);

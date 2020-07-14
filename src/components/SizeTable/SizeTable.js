import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import useStyles from './SizeTableStyle';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableHead, TableBody, Paper } from '@material-ui/core';
import {getSizeTable} from '../../redux/actions/sizeTable/';
import {StyledTableCell, StyledTableRow} from './SizeTableTheme';
import {capitalize} from '../../helpers/helpers';

const SizeTable = (props) => {
  const { id, data, getSizeTable } = props;
  const styles = useStyles();

  useEffect(() => {
    getSizeTable(id);
  }, [getSizeTable, id]);

  const tableHeaders = data && data.length && data[0].measurements.map((el, id) => (
    <StyledTableCell className={styles.cell} align="center" key={id}>{Object.keys(el)[0]}</StyledTableCell>
  ));

  const rows = data && data.length && data.map((el, id) => (
    <StyledTableRow key={id}>
      <StyledTableCell align="center" className={styles.cell} component="th" scope="row">
        {capitalize(el.sizeId.name)}
      </StyledTableCell>
      {el.measurements.map((item, key) => {
        const cell = Object.entries(item);
        return (<StyledTableCell className={styles.cell} align="center" key={key}>{`${cell[0][1].inches} in`}<br/>{`${cell[0][1].cm} cm`}</StyledTableCell>);
      })}
    </StyledTableRow>
  ));

  return (
    <TableContainer data-testid='sizeTable' component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell className={styles.cell} align="center">Size type</StyledTableCell>
            {data.length ? tableHeaders : null}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.length ? rows : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SizeTable.propTypes = {
  id: PropTypes.string.isRequired
};

const mapStateToProps = store => {
  return {
    data: store.sizeTable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSizeTable: id => dispatch(getSizeTable(id))
  };
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(SizeTable));

import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import CompareProductTable from '../../components/CompareProductTable/CompareProductTable';
import { getProductsByFilters } from '../../redux/actions/products';
import { useMediaQuery } from '@material-ui/core';

const ProductCompare = (props) => {
  const {getProductsByFilters, compareList} = props;
  const isMobile = useMediaQuery('(max-width: 550px)');

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      const filterArray = (compareList.length && [{_id: compareList}]) || [];
      if (filterArray.length) getProductsByFilters(filterArray, 1, 15, '');
    }
    return () => {
      isCanceled = true;
    };
  }, [compareList, getProductsByFilters]);
  return (
    <CompareProductTable isMobile={isMobile} compareList={compareList}/>
  );
};

const mapStateToProps = store => {
  return {
    compareList: store.compareList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    }
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductCompare));
import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import CompareProductTable from '../../components/CompareProductTable/CompareProductTable';
import { getProductsByFilters } from '../../redux/actions/products';
import { getStorageData } from '../../helpers/helpers';

const ProductCompare = (props) => {
  const {getProductsByFilters} = props;
  const compareList = getStorageData('compareList');
  // const isMobile = useMediaQuery('(max-width: 550px)');
  const filterArray = (compareList.length && [{_id: compareList}]) || [];

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      if (filterArray.length) getProductsByFilters(filterArray, 1, 10, '');
    }
    return () => {
      isCanceled = true;
    };
  }, [filterArray, getProductsByFilters]);
  return (
    <CompareProductTable compareList={compareList}/>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsByFilters: (filters, startPage, perPage, sort) => {
      dispatch(getProductsByFilters(filters, startPage, perPage, sort));
    }
  };
};

export default React.memo(connect(null, mapDispatchToProps)(ProductCompare));
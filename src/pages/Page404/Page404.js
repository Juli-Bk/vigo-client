import React from 'react';
import Error404 from '../../components/Error404/Error404';

const Page404 = (props) => {
  const {errorType, searchText} = props;
  return (
    <Error404 errorType={errorType} searchText={searchText}/>
  );
};

export default Page404;
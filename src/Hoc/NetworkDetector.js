import React, {useEffect} from 'react';
import Page404 from '../pages/Page404/Page404';
import {connect} from 'react-redux';
import {handleConnectionChange} from '../redux/actions/actions';

export default function (ComposedComponent) {
  const NetworkDetector = (props) => {
    const { isConnected, handleConnectionChange } = props;

    useEffect(() => {
      handleConnectionChange();

      return () => {
        handleConnectionChange(true);
      };
    });

    return (
      <>
        {!isConnected ? <Page404 errorType='network'/>
          : <ComposedComponent {...props}/>}
      </>
    );
  };

  const mapStateToProps = store => {
    return {
      isConnected: store.network
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      handleConnectionChange: () => dispatch(handleConnectionChange())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(NetworkDetector);
}
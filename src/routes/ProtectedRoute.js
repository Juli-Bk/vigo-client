import React from 'react';
import {Route} from 'react-router-dom';
import {getJWTfromCookie} from '../ajax/common/helper';

const ProtectedRoute = (props) => {
  const {component: Component, render, ...rest} = props;

  return (
    <Route {...rest} render={(renderProps) => {
      if (getJWTfromCookie()) {
        if (render) {
          return render(renderProps);
        } else {
          return <Component {...renderProps} />;
        }
      } else {
        return <Component {...renderProps} auth={false} />;
      }
    }}
    />
  );
};

export default ProtectedRoute;

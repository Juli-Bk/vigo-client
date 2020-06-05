import React, { useEffect } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Product from '../pages/Product/Product';
import Products from '../pages/Products/Products';
import ProductCompare from '../pages/ProductCompare/ProductCompare';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import Checkout from '../pages/Checkout/Checkout';
import About from '../pages/About/About';
import Contacts from '../pages/Contacts/Contacts';
import Page404 from '../pages/Page404/Page404';
import Header from '../containers/Header/Header';
import { connect } from 'react-redux';
import { changeWishList } from '../redux/actions/actions';
import { getStorageData } from '../helpers/helpers';

const AppRoutes = (props) => {
  const {changeWishList} = props;

  useEffect(() => {
    // todo get data from DB wishlist of authorized user for correct rendering favorite icons on all pages
    changeWishList(getStorageData('wishList'));
  }, [changeWishList]);

  return (
    <>
      <Route path='/:page?' component={Header} />
      <Switch>
        <Route exact path='/' component={Home}/>

        <Route exact path='/products/filter' component={Products}/>
        <Route exact path='/products/:id' component={Product}/>
        <Route exact path='/products' component={Products}/>

        <Route exact path='/compare' component={ProductCompare}/>
        <Route exact path='/cart' component={ShoppingCart}/>
        <Route exact path='/checkout' component={Checkout}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/contacts' component={Contacts}/>
        <Route path='*' component={Page404}/>
      </Switch>
    </>
  );
};

// todo add logic for protected routs

// eslint-disable-next-line
const ProtectedRoute = (props) => {
  const {component: Component, authenticated, render, ...rest} = props;

  return (
    <Route {...rest} render={(renderProps) => {
      if (authenticated) {
        if (render) {
          return render(renderProps);
        } else {
          return <Component {...renderProps} />;
        }
      }
      return <Redirect to='/login'/>;
    }}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default connect(null, mapDispatchToProps)(AppRoutes);
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Product from '../pages/Product/Product';
import Products from '../pages/Products/Products';
import ProductCompare from '../pages/ProductCompare/ProductCompare';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import Checkout from '../pages/Checkout/Checkout';
import Contacts from '../pages/Contacts/Contacts';
import Page404 from '../pages/Page404/Page404';
import Wishlist from '../pages/Wishlist/Wishlist';
import Header from '../containers/Header/Header';
import MyAccount from '../pages/MyAccount/MyAccount';
import {getJWTfromCookie} from '../ajax/common/helper';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Returns from '../pages/Returns/Returns';
import Shipping from '../pages/Shipping/Shipping';
import store from './../redux/store';
import {setLoginModalOpenState} from '../redux/actions/actions';
import AutoScrollTop from '../components/AutoScrollTop/AutoScrollTop';

const AppRoutes = () => {
  return (
    <>
      <Route path='/:page?' component={Header}/>
      <AutoScrollTop >
        <Switch>
          <Route exact path='/' component={Home}/>

          <Route exact path='/products/filter' component={Products}/>
          <Route exact path='/products/:id' component={Product}/>
          <Route exact path='/products' component={Products}/>

          <Route exact path='/compare' component={ProductCompare}/>
          <Route exact path='/wishlist' component={Wishlist}/>
          <Route exact path='/cart' component={ShoppingCart}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path='/contacts' component={Contacts}/>
          <Route exact path='/privacyPolicy' component={PrivacyPolicy}/>
          <Route exact path='/returns' component={Returns}/>
          <Route exact path='/shipping' component={Shipping}/>

          <ProtectedRoute
            authenticated={!!getJWTfromCookie()}
            exact path='/account'
            component={MyAccount}/>
          <Route path='*' component={Page404}/>
        </Switch>
      </AutoScrollTop>
    </>
  );
};

const ProtectedRoute = ({authenticated, ...props}) => authenticated
  ? <Route {...props} />
  : store.dispatch(setLoginModalOpenState(true));

export default AppRoutes;
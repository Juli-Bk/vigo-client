import Actions from '../constants/constants';

const reducer = (state = {checkoutBlocked: true}, action) => {
  switch (action.type) {
    case Actions.SET_SHIPPING:
      return {...state, shipping: action.payload};
    case Actions.SET_PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload};
    case Actions.SET_ORDER_DATA:
      return {...state, orderNumber: action.orderNumber, products: action.products};
    case Actions.SET_CHECKOUT_BLOCKED:
      return {...state, checkoutBlocked: action.payload};
    default:
      return state;
  }
};

export default reducer;
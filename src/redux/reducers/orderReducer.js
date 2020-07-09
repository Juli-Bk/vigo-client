import Actions from '../constants/constants';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_SHIPPING:
      return {...state, shipping: action.payload};
    case Actions.SET_PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload};
    case Actions.SET_ORDER_DATA:
      return {...state, orderNumber: action.orderNumber, products: action.products};
    default:
      return state;
  }
};

export default reducer;
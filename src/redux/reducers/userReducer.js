import Actions from '../constants/constants';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...action.payload
      };
    case Actions.SET_USER_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload
      };
    case Actions.SET_USER_NOVA_POSHTA_DATA:
      return {
        ...state,
        novaPoshta: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
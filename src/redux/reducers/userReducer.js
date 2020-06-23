import Actions from '../constants/constants';

const userReducer = (state = {}, action) => {
  if (action.type === Actions.SET_USER) {
    return action.payload;
  }
  if (action.type === Actions.SET_USER_DELIVERY_ADDRESS) {
    return {
      ...state,
      deliveryAddress: action.payload
    };
  }
  return state;
};

export default userReducer;
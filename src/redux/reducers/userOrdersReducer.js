import Actions from '../constants/constants';

const userOrders = (state = [], action) => {
  if (action.type === Actions.GET_USER_ORDERS) {
    return action.payload;
  }
  return state;
};

export default userOrders;
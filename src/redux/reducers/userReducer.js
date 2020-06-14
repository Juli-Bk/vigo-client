import Actions from '../constants/constants';

const userReducer = (state = {}, action) => {
  if (action.type === Actions.SET_USER) {
    return action.payload;
  }
  return state;
};

export default userReducer;
import Actions from '../constants/constants';

const guestReducer = (state = {}, action) => {
  if (action.type === Actions.SET_GUEST_DATA) {
    return action.payload;
  }
  return state;
};

export default guestReducer;
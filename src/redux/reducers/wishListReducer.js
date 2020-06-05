import Actions from '../constants/constants';

const wishList = (state = [], action) => {
  if (action.type === Actions.CHANGE_WISH_LIST) {
    return action.payload;
  }
  return state;
};

export default wishList;
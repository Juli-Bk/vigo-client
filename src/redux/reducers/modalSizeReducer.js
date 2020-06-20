import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.TOGGLE_MODAL_SIZE) {
    return action.payload;
  }
  return state;
};

export default reducer;
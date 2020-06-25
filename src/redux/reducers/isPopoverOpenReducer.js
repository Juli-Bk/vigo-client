import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.IS_POPOVER_OPEN) {
    return action.payload;
  }
  return state;
};

export default reducer;
import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.IS_RESTORE_MODAL_OPEN) {
    return action.payload;
  }
  return state;
};

export default reducer;
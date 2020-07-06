import Actions from '../constants/constants';

const reducer = (state = false, action) => {
  if (action.type === Actions.SET_LOADING_PROCESS) {
    return action.payload;
  }
  return state;
};

export default reducer;
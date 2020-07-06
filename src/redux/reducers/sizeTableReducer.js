import Actions from '../constants/constants';

const reducer = (state = [], action) => {
  if (action.type === Actions.SET_SIZE_TABLE) {
    return action.payload;
  }
  return state;
};

export default reducer;
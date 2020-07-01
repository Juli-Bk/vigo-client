import Actions from '../constants/constants';

const totalSum = (state = 0, action) => {
  if (action.type === Actions.SET_TOTAL_SUM) {
    return action.payload;
  }
  return state;
};

export default totalSum;
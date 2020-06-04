import Actions from '../constants/constants';

const currentPage = (state = 1, action) => {
  if (action.type === Actions.SET_CURRENT_PAGE) {
    return action.payload;
  }
  return state;
};

export default currentPage;
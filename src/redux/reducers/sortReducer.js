import Actions from '../constants/constants';

const sortingOption = (state = 'New In', action) => {
  if (action.type === Actions.SET_SORTING_OPTION) {
    return action.payload;
  }
  return state;
};

export default sortingOption;
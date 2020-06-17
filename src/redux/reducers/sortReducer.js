import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const sortingOption = (state = globalConfig.sortOptions.New_In, action) => {
  if (action.type === Actions.SET_SORTING_OPTION) {
    return action.payload;
  }
  return state;
};

export default sortingOption;
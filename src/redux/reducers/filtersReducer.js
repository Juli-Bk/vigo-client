import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const initialState = {
  minPrice: globalConfig.minDefaultPrice,
  maxPrice: globalConfig.maxDefaultPrice,
  color: [],
  size: []
};

const reducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case Actions.ADD_FILTERS:
      Object.keys(action.payload).forEach(key => {
        if (Object.keys(state).includes(key)) {
          newState = {...state, [key]: action.payload[key]};
        } else {
          newState = Object.assign({}, state, action.payload);
        }
      });
      return newState;
    case Actions.CLEAR_FILTERS:
      if (state.categoryId) {
        return {...initialState, categoryId: state.categoryId };
      } else {
        return initialState;
      }
    default:
      return state;
  }
};
export default reducer;
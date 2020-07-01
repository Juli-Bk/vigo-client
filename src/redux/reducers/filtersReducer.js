import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const initialState = {
  minPrice: globalConfig.minDefaultPrice,
  maxPrice: globalConfig.maxDefaultPrice,
  color: [],
  size: []
};

const reducer = (state = initialState, action) => {
  const { color, size } = state;
  let newArray = [];
  let newState = {};

  switch (action.type) {
    case Actions.SET_PRICE_RANGE:
      return { ...state, minPrice: action.payload[0], maxPrice: action.payload[1] };

    case Actions.SET_CHOSEN_COLOR:
      if (color.includes(action.payload)) {
        newArray = color.filter(item => item !== action.payload);
      } else {
        newArray = [...color, action.payload];
      }
      return { ...state, color: newArray };

    case Actions.SET_CHOSEN_SIZE:
      if (size.includes(action.payload)) {
        newArray = size.filter(item => item !== action.payload);
      } else {
        newArray = [...size, action.payload];
      }
      return { ...state, size: newArray };

    case Actions.SET_CATEGORY_ID:
      return {...state, categoryId: action.payload};

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
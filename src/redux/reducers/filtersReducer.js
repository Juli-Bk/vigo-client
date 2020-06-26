import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

const initialState = {
  minPrice: globalConfig.minDefaultPrice,
  maxPrice: globalConfig.maxDefaultPrice,
  color: [],
  size: [],
  categoryId: ''
};

const reducer = (state = initialState, action) => {
  const { color, size } = state;
  let newArray = [];

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
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};
export default reducer;
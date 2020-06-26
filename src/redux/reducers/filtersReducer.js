import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';
import {has} from '../../helpers/helpers';

const initialState = [
  {minPrice: globalConfig.minDefaultPrice},
  {maxPrice: globalConfig.maxDefaultPrice},
  {color: []},
  {size: []},
  {categoryId: ''}
];

const reducer = (state = initialState, action) => {
  if (action.type === Actions.SET_PRICE_RANGE) {
    const newState = [
      ...state,
      {minPrice: action.payload[0]},
      {maxPrice: action.payload[1]}
    ];

    return newState;
  }

  if (action.type === Actions.SET_CHOSEN_COLOR) {
    const color = state.find(item => {
      return has(item, 'color');
    }).color;

    let newColors = [];
    if (color.includes(action.payload)) {
      newColors = color.filter(item => item !== action.payload);
    } else {
      newColors = [...color, action.payload];
    }
    const updatedState = state.filter(item => !has(item, 'color'));
    const newState = [
      ...updatedState,
      {color: [...newColors]}
    ];

    return newState;
  }
  if (action.type === Actions.SET_CHOSEN_SIZE) {
    const size = state.find(item => {
      return has(item, 'size');
    }).size;

    let newSizes = [];
    if (size.includes(action.payload)) {
      newSizes = size.filter(item => item !== action.payload);
    } else {
      newSizes = [...size, action.payload];
    }

    const updatedState = state.filter(item => !has(item, 'size'));
    const newState = [
      ...updatedState,
      {size: [...newSizes]}
    ];

    return newState;
  }

  if (action.type === Actions.SET_CATEGORY_ID) {
    const updatedState = state.filter(item => !has(item, 'categoryId'));
    const newState = [
      ...updatedState,
      {categoryId: action.payload}
    ];
    return newState;
  }

  return state;
};

export default reducer;
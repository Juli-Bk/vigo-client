import Actions from '../constants/constants';

const initialState = {
  data: [],
  totalCount: 0,
  featured: {},
  special: {},
  newArrivals: {},
  bestSellers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SEARCH_PRODUCTS:
      return {...state, data: action.products, totalCount: action.totalCount};
    case Actions.GET_PRODUCTS_BY_FILTERS:
      return {...state, data: action.products, totalCount: action.totalCount};
    case Actions.GET_ALL_PRODUCTS:
      return {...state, data: action.products, totalCount: action.totalCount};
    case Actions.GET_FEATURED:
      return {...state, featured: {data: action.data, name: action.name}};
    case Actions.GET_SPECIAL:
      return {...state, special: {data: action.data, name: action.name}};
    case Actions.GET_NEW_ARRIVALS:
      return {...state, newArrivals: {data: action.data, name: action.name}};
    case Actions.GET_BESTSELLERS:
      return {...state, bestSellers: action.payload};
    case Actions.GET_RECENTLY_VIEWED:
      return {...state, recentlyViewed: action.payload};
    default:
      return state;
  }
};

export default reducer;
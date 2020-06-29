import Actions from '../constants/constants';

const initialState = {
  isOpen: false,
  message: '',
  severity: 'success'
};

const reducer = (state = initialState, action) => {
  if (action.type === Actions.SET_SNACK_MESSAGE_OPEN) {
    return {...state, isOpen: action.payload, message: action.message, severity: action.severity};
  }
  return state;
};

export default reducer;
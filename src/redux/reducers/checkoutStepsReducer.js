import Actions from '../constants/constants';

const activeStep = JSON.parse(localStorage.getItem('activeStep'));
const initialState = {
  active: activeStep || 0,
  completed: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_COMPLETED_STEPS:
      if (!state.completed.includes(action.payload)) {
        const newCompleted = [...state.completed, action.payload];
        return { ...state, completed: newCompleted };
      } else {
        return state;
      }
    case Actions.SET_ACTIVE_STEP:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

export default reducer;
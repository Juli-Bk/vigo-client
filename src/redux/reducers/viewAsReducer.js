import Actions from '../constants/constants';

export default (state = 'module', { type, payload }) => {
  switch (type) {
    case Actions.SET_CHOSEN_VIEW:
      return payload;

    default:
      return state;
  }
};
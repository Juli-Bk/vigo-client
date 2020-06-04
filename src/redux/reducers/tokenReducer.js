import Actions from '../constants/constants';

const token = (state = '', action) => {
  if (action.type === Actions.SET_JWT_TOKEN) {
    return action.payload;
  }
  return state;
};

export default token;
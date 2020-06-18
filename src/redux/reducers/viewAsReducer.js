import Actions from '../constants/constants';
import globalConfig from '../../globalConfig';

export default (state = globalConfig.viewOptions.module, { type, payload }) => {
  switch (type) {
    case Actions.SET_CHOSEN_VIEW:
      return payload;

    default:
      return state;
  }
};
import Actions from '../../constants/constants';
import { getStorageData } from '../../../helpers/helpers';

export const changeCompareList = () => {
  const data = getStorageData('compareList');
  return {type: Actions.CHANGE_COMPARE_LIST, payload: data};
};

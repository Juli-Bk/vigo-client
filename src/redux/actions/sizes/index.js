import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const getAllSizes = () => dispatch => {
  AjaxUtils.Sizes.getAllSizes()
    .then(result => {
      if (result.items) {
        const namesSet = new Set();
        result.items.forEach(size => {
          namesSet.add(size.name);
        });
        dispatch({type: Actions.GET_ALL_SIZES, items: result.items, names: Array.from(namesSet)});
      }
    });
};

export const setChosenSize = (size) => {
  return {type: Actions.SET_CHOSEN_SIZE, payload: size};
};

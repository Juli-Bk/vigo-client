import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import { setLoading } from '../actions';

export const getAllSizes = () => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.Sizes.getAllSizes()
    .then(result => {
      dispatch(setLoading(false));
      if (result && result.items) {
        const namesSet = new Set();
        result.items.forEach(size => {
          namesSet.add(size.name);
        });
        dispatch({type: Actions.GET_ALL_SIZES, items: result.items, names: Array.from(namesSet)});
      }
    }).catch(err => {
      dispatch(setLoading(false));
      console.log('get all sizes error happened', err);
    });
};

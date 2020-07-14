import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import {setLoading} from '../actions';

export const getSizeTable = (id) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.SizeTables.getSizeTableByProductId(id)
    .then(result => {
      dispatch(setLoading(false));
      if (result) {
        dispatch({type: Actions.SET_SIZE_TABLE, payload: result});
      }
    }).catch(err => {
      console.log('get size table error happened', err);
    });
};
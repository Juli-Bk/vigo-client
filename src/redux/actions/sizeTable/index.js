import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import {setLoading} from '../actions';

export const getSizeTable = (id) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.SizeTables.getSizeTableByProductId(id)
    .then(result => {
      console.log('Result from redux', result);
      dispatch(setLoading(false));
      if (result) {
        dispatch({type: Actions.SET_SIZE_TABLE, payload: result});
      }
    });
};
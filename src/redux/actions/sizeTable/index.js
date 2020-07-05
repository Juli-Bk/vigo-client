import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';
import {setLoading} from '../actions';

export const getSizeTable = (id) => dispatch => {
  dispatch(setLoading(true));
  AjaxUtils.SizeTables.getSizeTableByProductId(id)
  // to-do set loading proccess
    .then(result => {
      console.log('Result from redux', result);
      // to do turn-off loading proccess
      dispatch(setLoading(false));
      if (result) {
        dispatch({type: Actions.SET_SIZE_TABLE, payload: result});
      }
    });
};
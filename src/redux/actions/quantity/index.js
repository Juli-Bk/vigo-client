import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const getProductsQuantity = (idArray) => dispatch => {
  if (idArray.length) {
    idArray.forEach(id => {
      AjaxUtils.Quantity.getQuantityByProductId(id)
        .then(result => {
          if (result && result.length) {
            dispatch({type: Actions.GET_PRODUCTS_QUANTITY, payload: result, productId: id});
          }
        }).catch(err => {
          console.log('get products quantity error happened', err);
        });
    });
  }
};
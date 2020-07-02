import Actions from '../../constants/constants';
import AjaxUtils from '../../../ajax';

export const getAllColors = () => dispatch => {
  AjaxUtils.Colors.getAllColors()
    .then(result => {
      if (result && result.colors) {
        const colorsSet = new Map();
        result.colors.forEach(color => {
          colorsSet.set(color.baseColorName, {
            name: color.baseColorName,
            hex: color.hex
          });
        });

        const colors = Array.from(colorsSet).map(item => item[1]);
        dispatch({type: Actions.GET_ALL_COLORS, payload: colors});
      }
    });
};
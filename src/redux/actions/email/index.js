import AjaxUtils from '../../../ajax';
import {setSnackMessage} from '../actions';

export const sendEmail = (data, callback) => dispatch => {
  AjaxUtils.Email.sendEmail(data)
    .then(result => {
      callback && callback(result);
      if (result && result.status === 400) {
        dispatch(setSnackMessage(true, 'Error occurs during message sending', 'error'));
      } else {
        dispatch(setSnackMessage(true, 'Your email sent', 'success'));
      }
    }).catch(err => {
      console.log('send email error happened', err);
    });
};
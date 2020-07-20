import AjaxUtils from '../../../ajax';

export const subscribe = (email) => {
  AjaxUtils.Subscribers.subscribe(email)
    .then(result => {
      console.log(result);
    }).catch(err => {
      console.log('subscribe error happened', err);
    });
};
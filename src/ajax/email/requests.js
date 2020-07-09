import pathTo from '../common/paths';
import methods from '../common/methods';
import {isEmptyObj} from '../../helpers/helpers';

export default {
  /**
   * Sends email with specified parameters
   * @param formData {Object} - contains data for mailing. See an example below
   * @returns {Promise<Response | void>} - returns Promise. Use then method on it to get response result
   *
   * request body example:
   *        {
              "subject": "letter subject",
              "text": "letter text",
              "to": "addressToSentEmail@gmail.com",
              "from": "vigo.shop.official@gmail.com"
            }
   */
  sendEmail: (formData) => {
    if (!formData) throw new TypeError('empty form data');
    if (isEmptyObj(formData)) throw new TypeError('empty form data');

    const requestOptions = {
      body: JSON.stringify(formData),
      ...methods.POST,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch(pathTo.sendEmail, requestOptions)
      .then(async (response) => {
        const respData = await response.json();
        return Object.assign({
          status: response.status,
          statusText: response.statusText
        }, respData);
      })
      .catch(error => console.log('sendEmail error', error.message));
  }
};
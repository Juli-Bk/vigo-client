import * as Yup from 'yup';
import config from '../../globalConfig';

export const validateObject = {
  firstName: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(config.phoneNumberRegExp, 'Please, use +38(0XX)XXXXXXX format')
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  subscribe: Yup.bool(),
  confirmation: Yup.bool()
    .oneOf([true], 'We need your agreement on the privacy policy')
};
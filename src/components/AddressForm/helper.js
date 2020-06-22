import * as Yup from 'yup';
import config from '../../globalConfig';

export const validateObject = Yup.object().shape({
  autocomplete: Yup.string()
    .required('Required'),
  house: Yup.string()
    .min(1, 'Enter correct building number')
    .required('Required'),
  apartment: Yup.string()
    .min(1, 'Enter correct apartment number')
    .required('Required'),
  postalCode: Yup.string()
    .matches(config.postalCode, 'Please, use XXXX format')
    .required('Required'),
  confirmation: Yup.boolean()
    .oneOf([true], 'Please, accept privacy policy')
});